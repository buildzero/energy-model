
// Clause 9.x - Heat Transfer by Ventilation (pages 38-46)


// 9.2 - Total heat transfer by ventilation
// unit = megajoules
//
// Required:
//  * definition of climate
//  * definition of all air flow building elements (air infiltration, natural ventilation, etc)
//  * a specific month of the year (1=January, 12=December)
//  * set point for internal enviroment in heating and cooling mode
//
// NOTE: we are specifically doing the calculations for both heating and cooling
//       mode and including both results in the output of this function.
//
// Output:
//   {
//      coefficient: 7.7,
//      heating: 346.47,
//      cooling: 470.21
//   }
//
// Calculation Example:
//   transferCoefficient = 7.7 W/K
//   january = 2.678400 Ms
//   set points = 20C for heating, 26C for cooling
//   external temp january = 3.2C
// Result:
//   heating = 346.477824 MJ (96 kWh)
//   cooling = 470.219904 MJ (131 kWh)
export function heatTransferByVentilation(transferCoefficient, setPoint, climateExternalTemp, timePeriod) {
    // W/K (watts/kelvin) * C (celsius) * Ms (megasecond) = MJ (megajoule)
    return transferCoefficient * (setPoint - climateExternalTemp) * timePeriod;
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
