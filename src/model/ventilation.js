
// Clause 9.x - Heat Transfer by Ventilation (pages 38-46)
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
export function heatTransferByVentilation(month, setPointHeating, setPointCooling, climate, airflowElements) {
    // calculate the transfer coefficient for the given building definition
    let transferCoefficient = heatTransferCoefficientByVentilation(airflowElements);

    // other values we need for the calculations
    let climateExternalTemp = climate[month].external_temp;
    let timePeriodSeconds = MONTHS[month].seconds;

    // we run the calculation below for both set points!
    return {
        coefficient: transferCoefficient,
        heating: heatTransferByVentilationInternal(transferCoefficient, setPointHeating, climateExternalTemp, timePeriodSeconds),
        cooling: heatTransferByVentilationInternal(transferCoefficient, setPointCooling, climateExternalTemp, timePeriodSeconds)
    }
}

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
