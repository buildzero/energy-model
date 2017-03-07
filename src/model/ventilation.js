


// 9.2 - Total heat transfer by ventilation
function heatTransferByVentilationInternal(transferCoefficient, setPoint, climateExternalTemp, timePeriodSeconds) {
    // W/K (watts/kelvin) * C (celsius) * Ms (megasecond) = MJ (megajoule)
    // TODO: can we safely use farenheight here?  or is celsius required?
    return transferCoefficient * (setPoint - climateExternalTemp) * (timePeriodSeconds / 1000000);
}


// Ventilation heat transfer coefficient - 9.3 (page 39)
//
// Required:
//  * list of each airflow element
//
// unit = watts/kelvin
function heatTransferByVentilationCoefficient(airflowElements) {
    // calculate transfer flows for each airflow element
    let elementFlows = airflowElements.map((element) => ventilationAirflowForElement(element));

    // sum all the individual flows together
    let totalFlows = elementFlows.reduce((a, b) => a + b, 0);

    // multiply the sum of our flows against the constant for the heat capacity of air per volume
    return 1200 * totalFlows;
}

function ventilationAirflowForElement(element) {
    // for the temperature adjustment factor:
    // if the air comes from the outside air then the value = 1
    // if there is a heat recovery unit then there is a more detailed equation (9.3.3.8)
    // if element is a mechanical vent w/ central pre-heating/pre-cooling
    // another option is free night cooling

    // 9.3.3 - Temperature adjustment factor for airflow element
    // 9.3.3.1 - we may need to use different factors for heating/cooling modes
    // 9.3.3.3 - the adjustment factor is 1 when the supply air is from external
    // 9.3.3.4 - adjacent unconditioned space (N/A)
    // 9.3.3.5 - adjacent sunspaces (N/A)
    // 9.3.3.6 - adjacent buildings (N/A)
    // 9.3.3.8 - heat recovery unit = 1 - airflowFraction * recoveryUnitEfficiency
    //           TODO: it's also possible to have 2 recovery units in series
    // 9.3.3.9 - central pre-heating/pre-cooling
    // 9.3.3.10 - free cooling and night-time ventilation
    // 9.3.3.12 - Energy need for central pre-heating or pre-cooling
    let temperatureAdjustmentFactor = 1;

    // NOTE: we should be able to pre-calc the time-average airflow rate of the element
    return temperatureAdjustmentFactor * element.fractionOfOperation * element.airflowRate;
}


// m3/hr/m2
export function mechanicalVentilationRate(occupancyFraction, floorArea, outdoorAirStandardFlowRate) {
    let mechanicalVentFraction = occupancyFraction;

    let mechanicalSupplyRate = outdoorAirStandardFlowRate * 3.6 / floorArea;
    let mechanicalSupplyRateAvg = mechanicalSupplyRate * mechanicalVentFraction;

    // NOTE: there was some condition here with MAX(outdoorAirStandardFlowRate) that i couldn't decifer
    let mechanicalExhaustRate = outdoorAirStandardFlowRate * 3.6 / floorArea;
    let mechanicalExhaustRateAvg = mechanicalExhaustRate * mechanicalVentFraction;

    return {
        mechanicalSupplyRate,
        mechanicalSupplyRateAvg,
        mechanicalExhaustRate,
        mechanicalExhaustRateAvg
    };
}


export function naturalVentilationRate(aw, ck, buildingHeight, floorArea, setPoint, temp, windSpeed, nvAvailabilityFactor) {
    // D193 = supplyRate - exhaustRate
    // D206 = Q4PA (from input) 1.1
    // D207 = zone height 7.5
    // D208 = dCP for wind impact (constant) 0.75
    // D310 = max(occupied set point for heating) 21
    // CLIMATE!Y25 = temp 4
    // CLIMATE!Z25 = wind speed 4.6
    let aow = aw * ck;

    let V = 0.01 + 0.001 * Math.pow(windSpeed, 2) + 0.0035 * buildingHeight * Math.abs(setPoint - temp);
    let YWind = 1 - 0.1 * windSpeed;
    if (YWind > 1.0) {
        YWind = 1.0;
    } else if (YWind < 0) {
        YWind = 0.0;
    }

    let YTemp = temp / 25 + 0.2;
    if (YTemp > 1.0) {
        YTemp = 1.0;
    } else if (YTemp < 0) {
        YTemp = 0.0;
    }

    let Ropw = YWind * YTemp;
    let qv_airing = (Ropw * (3.6 * 500 * aow * Math.pow(V, 0.5)) / floorArea) * nvAvailabilityFactor;
    //let qv = (qv_airing < qv_min) ? qv_min : qv_airing;

    return {
        V,
        YWind,
        YTemp,
        Ropw,
        qv_airing
    }
}


export function airInfiltrationRate(q4pa, buildingHeight, setPoint, temp, windSpeed, supplyRate, exhaustRate, vsite) {
    const dCP_wind_impact = 0.75;

    let qv_stack = Math.max(0.0146 * q4pa * Math.pow(0.7 * buildingHeight * Math.abs(temp - setPoint), 0.667), 0.001);
    let qv_wind = 0.0769 * q4pa * Math.pow(dCP_wind_impact * vsite * Math.pow(windSpeed, 2), 0.667);
    let qv_sw = Math.max(qv_stack, qv_wind) + 0.14 * qv_stack * qv_wind / q4pa;
    let qv_inf = Math.max(0, -(supplyRate - exhaustRate)) + qv_sw;

    return {
        qv_stack,
        qv_wind,
        qv_sw,
        qv_inf
    }
}
