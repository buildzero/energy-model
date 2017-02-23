import {heatFlowRates} from "model/internal";
import {
    effectiveSolarCollectingAreaForGlazedElement,
    effectiveSolarCollectingAreaForOpaqueElement,
    solarHeatFlowRateForElement,
    thermalRadiationToSky
} from "model/solar";

import {surfaceHeatResistence} from "util/climate";


// ISO 13790-2008

// basic data about the months of the year
// NOTE: weekend_cnt is the number of days of the month which fall on a weekend (sat/sun)
const MONTHS = {
    1: {days: 31, hours: 744, seconds: 2678400, weekend_cnt: 9},
    2: {days: 28, hours: 672, seconds: 2419200, weekend_cnt: 8},
    3: {days: 31, hours: 744, seconds: 2678400, weekend_cnt: 8},
    4: {days: 30, hours: 720, seconds: 2592000, weekend_cnt: 10},
    5: {days: 31, hours: 744, seconds: 2678400, weekend_cnt: 8},
    6: {days: 30, hours: 720, seconds: 2592000, weekend_cnt: 8},
    7: {days: 31, hours: 744, seconds: 2678400, weekend_cnt: 10},
    8: {days: 31, hours: 744, seconds: 2678400, weekend_cnt: 8},
    9: {days: 30, hours: 720, seconds: 2592000, weekend_cnt: 9},
    10: {days: 31, hours: 744, seconds: 2678400, weekend_cnt: 9},
    11: {days: 30, hours: 720, seconds: 2592000, weekend_cnt: 8},
    12: {days: 31, hours: 744, seconds: 2678400, weekend_cnt: 10}
};


// Total Calculation Steps
//  * transmission heat transfer coefficient     (building elements)
//  * total heat capacity                        (basic settings)
//  * internal gains                             (basic usage inputs)
//  * solar gains                                (climate & building elements)

//  * set points
//  * transmission heat transfer
//  * ventilation heat transfer

//  * ventilation heat transfer coefficient
//  * gain/loss utilization factors
//  * heat gain/loss ratios
//  * building time constant
//  *


// Clause 7.x - Building energy need for space heating and cooling (pages 21-32)

// 7.1 - Overall calculation
function energyDemand() {
    // some of the final calculations require the ability to reference values from
    // different months for things like our dynamic parameters, so what we do is
    // take 2 passes over calculations for each month.  the first pass calculates
    // everything that we can safely calculate without any other dependencies. then
    // the second pass uses the data from the first pass to finish calculating the
    // things that have dependencies.  lastly we pull it all together

    // start with a simple data structure we'll use for our model output
    // we want to have results for each month of the year plus a "global"
    // results section which has values which are constant across months
    let results = {};

    // calculate individual energy demand values for each month
    for(let month in MONTHS) {
        results[month.id] = basicEnergyDemands(month, setPoint, climate, buildingEnvelope, airflowElements, components, elements);
    }

    // 12.2.1.1/12.2.1.2 - heat balance ratios
    let heatBalanceRatioHeating = heatingHeatGain / coolingHeatTransfer;
    let heatBalanceRatioCooling = coolingHeatGain / coolingHeatTransfer;

    // calculate global dynamic parameters, which are dependent on some of the values we just calculated above
    // NOTE: we need to identify if we are in a heating or cooling dominated climate
    // and then pull out the relevant data for a representative month depending on which
    // see 12.2.1.3 (page 66) regarding the Building Time Constant to better understand why
    // internalHeatCapacityOfBuilding
    let buildingTimeConstant = buildingTimeConstant();
    let gainUtilizationFactor = gainUtilizationFactor(heatingHeatTransfer, heatingHeatGain, buildingTimeConstant);
    let lossUtilizationFactor = lossUtilizationFactor(coolingHeatTransfer, coolingHeatGain, buildingTimeConstant);

    // claculate total heating/cooling loads monthly now that we have our dynamic parameters
    for(let month in MONTHS) {
        results[month.id].energyForHeating = energyForHeating(results[month.id], gainUtilizationFactor);
        results[month.id].energyForCooling = energyForCooling(results[month.id], lossUtilizationFactor);
    }

    // 7.4 - Length of heating and cooling seasons
    // * for each month, ratio of energy need for heating and cooling
}

// 7.2.1.1 - Energy need for heating
//
// Required:
//  * basic energy demand calculations for the given time period
//  * gain utilization factor for the given building definition
function energyForHeating(data, gainUtilizationFactor) {
    return data.heatingHeatTransfer - (gainUtilizationFactor * data.heatingHeatGain);
}

// 7.2.1.2 - Energy need for cooling
//
// Required:
//  * basic energy demand calculations for the given time period
//  * loss utilization factor for the given building definition
function energyForCooling(data, lossUtilizationFactor) {
    return data.coolingHeatGain - (lossUtilizationFactor * data.coolingHeatTransfer);
}


function basicEnergyDemands(month, setPointHeating, setPointCooling, climate, buildingEnvelope, airflowElements, components, elements) {
    // 8.x, 9.x, 10.x, 11.x - individual calculations for transfers and gains
    let transmissionTransfer = heatTransferByTransmission(month, setPointHeating, setPointCooling, climate, buildingEnvelope);
    let ventilationTransfer = heatTransferByVentilation(month, setPointHeating, setPointCooling, climate, airflowElements);
    let internalGain = heatGainInternal(month, components);
    let solarGain = heatGainSolar(month, climate, elements);

    // Total heat transfer
    let heatingHeatTransfer = transmissionTransfer.heating + ventilationTransfer.heating;
    let coolingHeatTransfer = transmissionTransfer.cooling + ventilationTransfer.cooling;

    // Total heat gain (this is the same in both heating and cooling mode)
    let heatingHeatGain = internalGain + solarGain;
    let coolingHeatGain = internalGain + solarGain;

    return {
        transmissionTransfer,
        ventilationTransfer,
        internalGain,
        solarGain,
        heatingHeatTransfer,
        coolingHeatTransfer,
        heatingHeatGain,
        coolingHeatGain
    }
}



// Clause 8.x - Heat Transfer by Transmission (pages 33-38)
// unit = megajoules
//
// Input:
//  * a specific month of the year (1=January, 12=December)
//  * set point of internal enviroment for heating
//  * set point of internal enviroment for cooling
//  * definition of climate
//  * definition of all externally facing building elements (walls, roofs, windows, etc)
//
// NOTE: we are specifically doing the calculations for both heating and cooling
//       mode and including both results in the output of this function.
//
// Output:
//  * object containing 3 attributes: coefficient, heating, cooling
//
// Example Input:
//   transferCoefficient = 18.2 W/K
//   january = 2.678400 Ms
//   set points = 20C for heating, 26C for cooling
//   external temp january = 3.2C
//
// Example Output:
//   {
//      coefficient: 18.2,
//      heating: 818.947584,
//      cooling: 1111.428864
//   }
export function heatTransferTransmission(month, setPointHeating, setPointCooling, climate, buildingElements) {
    // filter down our building envelope elements to just the external facing
    // walls and windows which affect transmission
    let walls = buildingElements.filter((elem) => elem.type === "wall" || elem.type === "roof");
    let windows = buildingElements.filter((elem) => elem.type === "window");

    // calculate the transfer coefficient for the given building definition
    let transferCoefficient = heatTransferByTransmissionCoefficient(walls, windows);

    // other values we need for the calculations
    let climateExternalTemp = climate[month].temp;
    let timePeriodSeconds = MONTHS[month].seconds;

    // run the calculation for both heating and cooling modes
    return {
        coefficient: transferCoefficient,
        heating: heatTransferByTransmission(transferCoefficient, setPointHeating, climateExternalTemp, timePeriodSeconds),
        cooling: heatTransferByTransmission(transferCoefficient, setPointCooling, climateExternalTemp, timePeriodSeconds)
    }
}


// Clause 10.x - Internal Heat Gains (pages 47-53)
// unit = megajoules
//
// Input:
//  * a specific month of the year (1=January, 12=December)
//  * an array of hourly usage conditions for the building (24 entries)
//  * an object containing the global building settings
//
// NOTE: we are explicitly skipping the portion of this calculation that is due
//       to unconditioned adjacent spaces, which is considered unnecessary
//
// Output:
//  {
//      occupancy_rate: 123, (watts)
//      occupancy: 456,      (megajoules)
//      appliance_rate: 123, (watts)
//      appliance: 456,      (megajoules)
//      lighting_rate: 123,  (watts)
//      lighting: 456,       (megajoules)
//      total_rate: 369,     (watts)
//      total: 1368          (megajoules)
//  }
//
export function heatGainInternal(month, hourlyConditions, settings) {
    // calculate out the internal heat flow rates for each hour of a representative day
    let hourlyFlowRates = hourlyConditions.map((conditions) => heatFlowRates(conditions, settings));

    let output = {
        occupancy_rate: avgFlowRate(month, hourlyFlowRates, settings.floor_area, "occupancy"),
        appliance_rate: avgFlowRate(month, hourlyFlowRates, settings.floor_area, "appliance"),
        lighting_rate: avgFlowRate(month, hourlyFlowRates, settings.floor_area, "lighting"),
    };

    output.total_rate = output.occupancy_rate + output.appliance_rate + output.lighting_rate;

    // final monthly gains is given by multiplying the avg by the timeperiod in megaseconds
    output.occupancy = output.occupancy_rate * (MONTHS[month].seconds / 1000000);
    output.appliance = output.appliance_rate * (MONTHS[month].seconds / 1000000);
    output.lighting = output.lighting_rate * (MONTHS[month].seconds / 1000000);
    output.total = output.total_rate  * (MONTHS[month].seconds / 1000000);

    return output;
}

// this helps us take the monthly time averaged heat flow rate for a given category
function avgFlowRate(month, flowRates, floorArea, attr) {
    let avgRateWeekday = flowRates.reduce((val, data) => val + data[attr+"_rate_wd"], 0)/24;
    let avgRateWeekend = flowRates.reduce((val, data) => val + data[attr+"_rate_we"], 0)/24;
    let totalWeekdayRate = (MONTHS[month].days - MONTHS[month].weekend_cnt) * avgRateWeekday;
    let totalWeekendRate = MONTHS[month].weekend_cnt * avgRateWeekend;
    return ((totalWeekdayRate + totalWeekendRate) / MONTHS[month].days) * floorArea;
}


// Clause 11.x - Solar Heat Gains (pages 53-61)
// unit = megajoules
//
// Input:
//  * a specific month of the year (1=January, 12=December)
//  * definition of climate
//  * definition of all externally facing building elements (walls, roofs, windows, etc)
//
// NOTE: we are explicitly skipping the portion of this calculation that is due
//       to unconditioned adjacent spaces, which is considered unnecessary
//
// NOTE: the results for heat gains are the same in heating in cooling mode, so
//       this calculation does not distinguish between them.
//
// Output:
//  * solar gains (megajoules)
//
// Intermediate calculations:
//  * the "effective collecting area" of the opaque part of an element can be
//    calculated once we know its dimensions and assembly it uses.
//  * we can determine the "frame area fraction" of a glazing element once we
//    have the area information about the frame and overall window
//
// Climate dependent calculations:
//  * the "effective collecting area" of a glazed component requires information
//    about the solar irradiance for the appropriate latitude and sun angles.
//  * "air temperature delta" requires having average air temps and sky temps.
//  * "radiative heat transfer coefficient" requires avg of surface and sky temp.
//
export function heatGainSolar(month, climate, buildingElements) {
    // filter down our building envelope elements to just the external facing
    // walls and windows which affect transmission
    let walls = buildingElements.filter((elem) => elem.type === "wall" || elem.type === "roof");
    let windows = buildingElements.filter((elem) => elem.type === "window");
    // TODO: how to account for "sunspaces"??

    // TODO: !!!!!!!!!!!!!  We may want to invert this calculation procedure
    //                      so that we calculate all months of year grouped by
    //                      element so that we can see how each element performs.
    //                      By summing elements by month we have no insight into
    //                      what parts of a building are underperforming.

    // TODO: shading reduction factor - accounts for effects of external shading.
    // by setting this to 1.0 we are saying there is no shading (yet!)
    let globalShadeReductionFactor = 1.0;

    // determine the surface heat resistance using the climate wind speed
    let surfaceHR = surfaceHeatResistence(climate.wind_speed);

    // WALLS - iterate over all opaque wall definitions and calculate solar gains
    let totalWallHeatFlow = 0;
    for (var i = 0; i < walls.length; i++) {
        let wall = walls[i];

        // TODO: use the appropriate orientation to determine this
        let orient = wall.orientation ? wall.orientation : "HOR";
        let solarIrradiance = climate["avg_solar_"+orient];

        // NOTE: form factor is 0.5 for walls and 1.0 for roofs
        let formFactor = (wall.type === "roof") ? 1.0 : 0.5;


        // effective collecting area
        let effectiveCollectingArea = effectiveSolarCollectingAreaForOpaqueElement(wall.area, wall.u_value, wall.absorptivity, surfaceHR);

        // calculate radiation to sky for our wall
        let radiationToSky = thermalRadiationToSky(wall.area, wall.u_value, wall.emissivity, surfaceHR, climate.temp, climate.sky_temp);

        // calculate the total heat flow rate for this element
        let heatFlowRate = solarHeatFlowRateForElement(globalShadeReductionFactor, effectiveCollectingArea, solarIrradiance, formFactor, radiationToSky);

        // console.info("wall", orient, " -> ", effectiveCollectingArea, radiationToSky, heatFlowRate);

        // add to total heat flow rate
        totalWallHeatFlow += heatFlowRate;
    }

    // WINDOWS - iterate over all window definitions and calculate solar gains
    let totalWindowHeatFlow = 0;
    for (var i = 0; i < windows.length; i++) {
        let win = windows[i];

        // TODO: movable shading factor.  we need to account for things like a manual shade on the window
        //       which is different than the general shade reduction factor.
        // NOTE: we can make a total shade reduction coefficient by multiplying
        //       the temporary shade reduction by the global shade reduction
        let shadeReductionFactor = globalShadeReductionFactor * win.reduction_factor_Z_for_temporary;

        // TODO: window frame area fraction is 0.2 for heating-dominated climates
        //       and 0.3 for cooling-dominated climates per 11.4.5
        let frameAreaFraction = 0.3;

        // TODO: use the appropriate orientation to determine this
        let orient = win.orientation ? win.orientation : "HOR";
        let solarIrradiance = climate["avg_solar_"+orient];

        // NOTE: form factor is 0.5 for walls and 1.0 for roofs
        let formFactor = (win.type === "roof") ? 1.0 : 0.5;


        // effective collecting area
        let effectiveCollectingArea = effectiveSolarCollectingAreaForGlazedElement(win.area, frameAreaFraction, climate.solar_transmittance, shadeReductionFactor);

        // calculate radiation to sky for our wall
        let radiationToSky = thermalRadiationToSky(win.area, win.u_value, win.emissivity, surfaceHR, climate.temp, climate.sky_temp);

        // total solar gains
        let heatFlowRate = solarHeatFlowRateForElement(shadeReductionFactor, effectiveCollectingArea, solarIrradiance, formFactor, radiationToSky);

        // console.info("window", orient, " -> ", effectiveCollectingArea, radiationToSky, heatFlowRate);

        // add to total heat flow rate
        totalWindowHeatFlow += heatFlowRate;
    }

    // multiply our time-averaged gains against our time period
    return (totalWallHeatFlow + totalWindowHeatFlow) * (MONTHS[month].seconds / 1000000);
}
