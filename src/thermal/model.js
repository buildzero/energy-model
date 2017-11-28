import _ from "underscore";

import {
    heatFlowRates
} from "thermal/internal";

import {
    effectiveSolarCollectingAreaForGlazedElement,
    effectiveSolarCollectingAreaForOpaqueElement,
    solarHeatFlowRateForElement,
    thermalRadiationToSky
} from "thermal/solar";

import {
    heatTransferByTransmission, 
    heatTransferByTransmissionCoefficient
} from "thermal/transmission";

import {
    heatTransferByVentilation,
    mechanicalVentilationRate,
    naturalVentilationRate,
    airInfiltrationRate
} from "thermal/ventilation";

import {
    dimensionlessNumericalParameter,
    buildingTimeConstant,
    gainUtilizationFactor,
    lossUtilizationFactor
} from "thermal/dynamic_parameters";

import {internalHeatCapacityByType, thermalMass, vsite, heatRecoveryEfficiency, windowOpeningAngleCk} from "util/building";
import {surfaceHeatResistence} from "util/climate";
import {MathHelper} from "util/math";
import {MONTHS, summarizeUsageConditions} from "util/schedule";


// ISO 13790-2008

// Clause 7.x - Building energy need for space heating and cooling (pages 21-32)
// 7.1 - Overall calculation
export function thermalDemand(settings, hourlyConditions, buildingElements, climateData) {
    // some of the final calculations require the ability to reference values from
    // different months for things like our dynamic parameters, so what we do is
    // take 2 passes over calculations for each month.  the first pass calculates
    // everything that we can safely calculate without any other dependencies. then
    // the second pass uses the data from the first pass to finish calculating the
    // things that have dependencies.  lastly we pull it all together

    // start with a simple data structure we'll use for our model output
    // we want to have results for each month of the year plus a "global"
    // results section which has values which are constant across months
    let results = {global: {}};

    // separate walls from windows
    let walls = buildingElements.filter((elem) => elem.type === "wall" || elem.type === "roof");
    let windows = buildingElements.filter((elem) => elem.type === "window");

    // 1. Global Transmission HT Coefficient
    results.global.transmissionHeatTransferCoeff = heatTransferByTransmissionCoefficient(walls, windows);

    // 2. Global Heat Capacity
    results.global.buildingHeatCapacity = internalHeatCapacityByType(settings.heat_capacity_type) * settings.floor_area;

    // 3.* calculate monthly gains and ventilation transfer coefficients
    results.monthly = MONTHS.map((month, monthIndex) => {
        let climate = climateData[monthIndex];

        // 3.1 Internal Gains
        let internalGain = heatGainInternal(month, hourlyConditions, settings);

        // 3.2 Solar Gains
        let solarGain = heatGainSolar(month, climate, walls, windows);

        // 3.3 Total Gains
        let totalGain = internalGain.total + solarGain.total;
        let totalGainHourly = {
            weekday: MathHelper.arrayAdd(internalGain.detailed.weekday, solarGain.detailed),
            weekend: MathHelper.arrayAdd(internalGain.detailed.weekend, solarGain.detailed)
        };

        // 3.4 Ventilation Heat Transfer Coefficients
        let ventilationTransferCoeffs = heatTransferVentilationCoefficient(month, settings, hourlyConditions, climate);

        return {
            internalGain,
            solarGain,
            totalGain,
            totalGainHourly,
            ventilationTransferCoeffs
        };
    });

    // 4. Indoor Conditions
    results.global.indoorConditions = indoorConditions(settings, hourlyConditions, results.global.transmissionHeatTransferCoeff, results.monthly.map((v) => v.totalGainHourly), results.monthly.map((v) => v.ventilationTransferCoeffs), climateData);
    
    // 5.* calculate monthly heat transfer
    let monthlyHeatTransfer = MONTHS.map((month, monthIndex) => {
        let climate = climateData[monthIndex];

        // 5.1 Transmission Heat Transfer
        let transmissionTransfer = {
            heating: heatTransferByTransmission(results.global.transmissionHeatTransferCoeff, results.global.indoorConditions.heating[monthIndex], climate.temp, month.megaseconds),
            cooling: heatTransferByTransmission(results.global.transmissionHeatTransferCoeff, results.global.indoorConditions.cooling[monthIndex], climate.temp, month.megaseconds)
        };
        
        // 5.2 Ventilation Heat Transfer
        let ventilationTransfer = {
            heating: heatTransferByVentilation(results.monthly[monthIndex].ventilationTransferCoeffs.heating.average, results.global.indoorConditions.heating[monthIndex], climate.temp, month.megaseconds),
            cooling: heatTransferByVentilation(results.monthly[monthIndex].ventilationTransferCoeffs.cooling.average, results.global.indoorConditions.cooling[monthIndex], climate.temp, month.megaseconds)
        };

        // 5.3 Total Heat Transfer
        let totalTransfer = {
            heating: transmissionTransfer.heating + ventilationTransfer.heating,
            cooling: transmissionTransfer.cooling + ventilationTransfer.cooling
        };

        return {
            transmissionTransfer,
            ventilationTransfer,
            totalTransfer
        };
    });

    // combine our heat transfer data and gains data into a single monthly results array
    results.monthly = results.monthly.map((v, idx) => _.extend(v, monthlyHeatTransfer[idx]));

    // 6.* calculate dynamic parameters
    let dynamicParameters = MONTHS.map((month, monthIndex) => {
        let monthData = results.monthly[monthIndex];

        let params = {heating: {}, cooling: {}};

        // 6.1 Heat Balance Ratio
        params.heating.heatBalanceRatio = monthData.totalGain / monthData.totalTransfer.heating;
        params.cooling.heatBalanceRatio = monthData.totalGain / monthData.totalTransfer.cooling;

        // 6.2 Building Time Constant = heat capacity / 3600 / (transmissionCoeff + ventilationCoeff)
        params.heating.buildingTimeConstant = buildingTimeConstant(results.global.buildingHeatCapacity, results.global.transmissionHeatTransferCoeff, monthData.ventilationTransferCoeffs.heating.average);
        params.cooling.buildingTimeConstant = buildingTimeConstant(results.global.buildingHeatCapacity, results.global.transmissionHeatTransferCoeff, monthData.ventilationTransferCoeffs.cooling.average);

        // 6.3 Dimensionless Numerical Parameter == 1 + buildingTimeConstant / 15
        params.heating.dimensionlessNumericalParameter = dimensionlessNumericalParameter(params.heating.buildingTimeConstant);
        params.cooling.dimensionlessNumericalParameter = dimensionlessNumericalParameter(params.cooling.buildingTimeConstant);

        // 6.4 Gain/Loss Utilization Factor
        params.heating.utilizationFactor = gainUtilizationFactor(monthData.totalGain / monthData.totalTransfer.heating, params.heating.dimensionlessNumericalParameter);
        params.cooling.utilizationFactor = lossUtilizationFactor(monthData.totalGain / monthData.totalTransfer.cooling, params.cooling.dimensionlessNumericalParameter);

        return params;
    });

    // combine our dynamic parameters data into our monthly results array
    results.monthly = results.monthly.map((v, idx) => _.extend(v, {dynamicParameters: dynamicParameters[idx]}));

    // claculate total heating/cooling loads monthly now that we have our dynamic parameters
    let totalDemand = MONTHS.map((month, monthIndex) => {
        let monthData = results.monthly[monthIndex];

        return {
            energyForHeating: energyForHeating(monthData.dynamicParameters.heating.utilizationFactor, monthData.totalTransfer.heating, monthData.totalGain),
            energyForCooling: energyForCooling(monthData.dynamicParameters.cooling.utilizationFactor, monthData.totalTransfer.cooling, monthData.totalGain)
        };
    });
    
    // combine our dynamic parameters data into our monthly results array
    results.monthly = results.monthly.map((v, idx) => _.extend(v, totalDemand[idx]));
    
    return results;
}

// 7.2.1.1 - Energy need for heating
//
// Required:
//  * basic energy demand calculations for the given time period
//  * gain utilization factor for the given building definition
function energyForHeating(gainUtilizationFactor, heatTransfer, heatGain) {
    return heatTransfer - (gainUtilizationFactor * heatGain);
}

// 7.2.1.2 - Energy need for cooling
//
// Required:
//  * basic energy demand calculations for the given time period
//  * loss utilization factor for the given building definition
function energyForCooling(lossUtilizationFactor, heatTransfer, heatGain) {
    return heatGain - (lossUtilizationFactor * heatTransfer);
}



// Clause 9.x - Heat Transfer by Ventilation (pages 38-46)
export function heatTransferVentilationCoefficient(month, settings, hourlyConditions, climate) {
    // q = air flow rate
    // H = coefficient

    let summarizedConditions = summarizeUsageConditions(hourlyConditions);
    let hrEfficiency = heatRecoveryEfficiency(settings.heat_recovery_type);
    let minHeatFlowRate = 30 * settings.occupants / settings.floor_area;

    // (D12) get the standardized air flow rate in L/s
    let outdoorAirStandardFlowRate = settings.outdoor_air_flow_rate * (settings.floor_area / settings.occupant_density);

    // TODO: we need to do this for both heating and cooling
    let setPoint = 0;

    // Mechanical Ventilation
    let mechRates = mechanicalVentilationRate(summarizedConditions.occupancy_weekly_fraction, settings.floor_area, outdoorAirStandardFlowRate);
    let mechRate = mechRates.mechanicalSupplyRate * settings.exhaust_air_recirculation_percent;
    mechRate = (mechRate < minHeatFlowRate) ? minHeatFlowRate : mechRate;
    mechRate = (1 - hrEfficiency) * mechRate;

    // Natural Ventilation (open windows)
    // TODO: this doesn't work yet because we need a way to calculate nvAvailabilityFactor
    let nvAvailabilityFactor = 0;
    let setPointHeating = 0;
    let ck = windowOpeningAngleCk(settings.window_opening_angle);
    let nvRate = naturalVentilationRate(settings.window_area_opened, ck, settings.building_height, settings.floor_area, setPointHeating, climate.temp, climate.wind_speed, nvAvailabilityFactor);

    // Infiltration
    // TODO: heating and cooling mode
    let buildingVsite = vsite(settings.terrain_class);
    let infiltrationRate = airInfiltrationRate(settings.air_leakage_level, settings.building_height, setPointHeating, climate.temp, climate.wind_speed, mechRates.mechanicalSupplyRate, mechRates.mechanicalExhaustRate, buildingVsite);

    // Total Ventilation (based on type)
    // type=1, Mechanical Ventilation
    // type=2, Mechanical Ventilation + Natural Ventilation
    // type=3, Natural Ventilation
    let heatFlowRateOcc = 0;
    if (settings.ventilation_type === 1) {
        heatFlowRateOcc = mechRate;
    } else if (settings.ventilation_type === 3) {
        // when we are using purely natural ventilation then normalize
        heatFlowRateOcc = (nvRate < minHeatFlowRate) ? minHeatFlowRate : nvRate;
    } else {
        heatFlowRateOcc = mechRate + nvRate;
    }

    // TODO: unoccupied ventilation calc
    let heatFlowRateUnocc = 0;


    let outdoorAirAch = mechRates.mechanicalSupplyRate / settings.total_ventilated_volume * settings.floor_area;
    let mechanicalVentFraction = summarizedConditions.occupancy_weekly_fraction;
    let occVentilationFactor = mechanicalVentFraction;  // TODO: i'm not 100% these are the same thing
    let unoccVentilationFactor = (settings.ventilation_demand_control === "always_on") ? 0.0 : 1 - occVentilationFactor;
    let avgHeatFlowRate = heatFlowRateOcc * occVentilationFactor + heatFlowRateUnocc * unoccVentilationFactor + infiltrationRate.qv_inf;


    // calculate out the ventilation coefficient (Hve) on an hourly basis
    let ventilationCoeffHeating = {
        weekday: new Array(24),
        weekend: new Array(24)
    };
    let ventilationCoeffCooling = {
        weekday: new Array(24),
        weekend: new Array(24)
    };
    for (let h = 0; h < 24; h++) {
        let qv_inf_heat = airInfiltrationRate(settings.air_leakage_level, settings.building_height, hourlyConditions[h].wd_heat_point, climate.hourly_dry_bulb_temp[h], climate.hourly_wind_speed[h], mechRates.mechanicalSupplyRate, mechRates.mechanicalExhaustRate, buildingVsite);
        let qv_inf_cool = airInfiltrationRate(settings.air_leakage_level, settings.building_height, hourlyConditions[h].wd_cool_point, climate.hourly_dry_bulb_temp[h], climate.hourly_wind_speed[h], mechRates.mechanicalSupplyRate, mechRates.mechanicalExhaustRate, buildingVsite);

        // heating
        ventilationCoeffHeating.weekday[h] = (heatFlowRateOcc * hourlyConditions[h].wd_occupancy + heatFlowRateUnocc * (1 - hourlyConditions[h].wd_occupancy) + qv_inf_heat.qv_inf) / 3.6 * 1.2 * settings.floor_area;
        ventilationCoeffHeating.weekend[h] = (heatFlowRateOcc * hourlyConditions[h].we_occupancy + heatFlowRateUnocc * (1 - hourlyConditions[h].we_occupancy) + qv_inf_heat.qv_inf) / 3.6 * 1.2 * settings.floor_area;

        // cooling
        ventilationCoeffCooling.weekday[h] = (heatFlowRateOcc * hourlyConditions[h].wd_occupancy + heatFlowRateUnocc * (1 - hourlyConditions[h].wd_occupancy) + qv_inf_cool.qv_inf) / 3.6 * 1.2 * settings.floor_area;
        ventilationCoeffCooling.weekend[h] = (heatFlowRateOcc * hourlyConditions[h].we_occupancy + heatFlowRateUnocc * (1 - hourlyConditions[h].we_occupancy) + qv_inf_cool.qv_inf) / 3.6 * 1.2 * settings.floor_area;
    }

    // once we have the hourly data we can roll it up to monthly averages
    ventilationCoeffHeating.average = avgCoeff(month, ventilationCoeffHeating);
    ventilationCoeffCooling.average = avgCoeff(month, ventilationCoeffCooling);

    return {
        heating: ventilationCoeffHeating,
        cooling: ventilationCoeffCooling
    };
}

// this helps us take the monthly time averaged heat flow rate for a given category
function avgCoeff(month, hourlyVentilationCoeffs) {
    let avgWeekday = hourlyVentilationCoeffs.weekday.reduce((acc, val) => acc + val, 0)/24;
    let avgWeekend = hourlyVentilationCoeffs.weekend.reduce((acc, val) => acc + val, 0)/24;
    let totalWeekday = (month.days - month.weekend_cnt) * avgWeekday;
    let totalWeekend = month.weekend_cnt * avgWeekend;
    return (totalWeekday + totalWeekend) / month.days;
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

    // start by calculating our total monthly gains also broken out by category or gain
    // NOTE: we also leave in the heat flow rate variables just for reference
    let output = {
        occupancy_rate: avgFlowRate(month, hourlyFlowRates, settings.floor_area, "occupancy"),
        appliance_rate: avgFlowRate(month, hourlyFlowRates, settings.floor_area, "appliance"),
        lighting_rate: avgFlowRate(month, hourlyFlowRates, settings.floor_area, "lighting"),
    };

    // total flow rate is just a sum of the individual flow rates
    output.total_rate = output.occupancy_rate + output.appliance_rate + output.lighting_rate;

    // final monthly gains is given by multiplying the avg by the timeperiod in megaseconds
    output.occupancy = output.occupancy_rate * month.megaseconds;
    output.appliance = output.appliance_rate * month.megaseconds;
    output.lighting = output.lighting_rate * month.megaseconds;
    output.total = output.total_rate  * month.megaseconds;

    // the second thing we need to calculate is total gains per hour-of-day also
    // broken out between weekend and weekday usage scenarios
    let weekdayDetails = hourlyFlowRates.map((hour) => hour.total_rate_wd * settings.floor_area);
    let weekendDetails = hourlyFlowRates.map((hour) => hour.total_rate_we * settings.floor_area);
    output.detailed = {
        weekday: weekdayDetails,
        weekend: weekendDetails
    }

    return output;
}

// this helps us take the monthly time averaged heat flow rate for a given category
function avgFlowRate(month, flowRates, floorArea, attr) {
    let avgRateWeekday = flowRates.reduce((val, data) => val + data[attr+"_rate_wd"], 0)/24;
    let avgRateWeekend = flowRates.reduce((val, data) => val + data[attr+"_rate_we"], 0)/24;
    let totalWeekdayRate = (month.days - month.weekend_cnt) * avgRateWeekday;
    let totalWeekendRate = month.weekend_cnt * avgRateWeekend;
    return ((totalWeekdayRate + totalWeekendRate) / month.days) * floorArea;
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
export function heatGainSolar(month, climate, walls, windows) {
    // TODO: shading reduction factor - accounts for effects of external shading.
    // by setting this to 1.0 we are saying there is no shading (yet!)
    let globalShadeReductionFactor = 1.0;

    // determine the surface heat resistance using the climate wind speed
    let surfaceHR = surfaceHeatResistence(climate.wind_speed);

    // WALLS - iterate over all opaque wall definitions and calculate solar gains
    let wallGains = walls.map(function(wall) {
        // grab appropriate solar irradiance value from the climate data based on orientation
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

        // solar gain (MJ)
        let gain = heatFlowRate * month.megaseconds;

        return {
            id: wall.id,
            heatFlowRate,
            gain
        };
    });

    // WINDOWS - iterate over all window definitions and calculate solar gains
    let windowGains = windows.map(function(win) {
        const windowShadeReductionFaction = win.global_shade_reduction_factor || globalShadeReductionFactor;

        // NOTE: we can make a total shade reduction coefficient by multiplying
        //       the temporary shade reduction by the global shade reduction
        let shadeReductionFactor = windowShadeReductionFaction * win.reduction_factor_Z_for_temporary;

        // TODO: window frame area fraction is 0.2 for heating-dominated climates
        //       and 0.3 for cooling-dominated climates per 11.4.5
        let frameAreaFraction = 0.3;

        // grab appropriate solar irradiance value from the climate data based on orientation
        let orient = win.orientation ? win.orientation : "HOR";
        let solarIrradiance = climate["avg_solar_"+orient];

        // NOTE: form factor is 0.5 for walls and 1.0 for roofs
        let formFactor = (win.type === "roof") ? 1.0 : 0.5;

        // effective collecting area
        // the effective solar transmittance is the product of the transmittance via atmosphere and transmittance via window
        let transmittance = win.solar_transmittance * climate.solar_transmittance;
        let effectiveCollectingArea = effectiveSolarCollectingAreaForGlazedElement(win.area, frameAreaFraction, transmittance, shadeReductionFactor);

        // calculate radiation to sky for our wall
        let radiationToSky = thermalRadiationToSky(win.area, win.u_value, win.emissivity, surfaceHR, climate.temp, climate.sky_temp);

        // total solar gains
        let heatFlowRate = solarHeatFlowRateForElement(shadeReductionFactor, effectiveCollectingArea, solarIrradiance, formFactor, radiationToSky);

        // solar gain (MJ)
        let gain = heatFlowRate * month.megaseconds;

        return {
            id: win.id,
            heatFlowRate,
            gain
        };
    });

    // calculate the total monthly flow rate and gains
    let totalHeatFlowRate = wallGains.reduce((a, v) => a + v.heatFlowRate, 0) + windowGains.reduce((a, v) => a + v.heatFlowRate, 0);
    let totalGains = totalHeatFlowRate * month.megaseconds;

    // detailed gains per hour-of-day
    // NOTE: we can do these next 2 things ahead of time in the climate data
    let dailyHorizSolarRadiation = climate.hourly_horiz_solar_rad.reduce((a, v) => a + v, 0);
    let hourlyRatioOfSolarRadiation = climate.hourly_horiz_solar_rad.map((v) => v / dailyHorizSolarRadiation);
    let solarGainsDaily = totalHeatFlowRate * 24;
    let hourlyGains = hourlyRatioOfSolarRadiation.map((v) => v * solarGainsDaily);

    return {
        detailed: hourlyGains,
        walls: wallGains.map((v) => _.omit(v, "heatFlowRate")),
        windows: windowGains.map((v) => _.omit(v, "heatFlowRate")),
        total: totalGains
    }
}


// Clause 13.x - Indoor Conditions a.k.a. Set Points (pages 68-76)
export function indoorConditions(settings, hourlyConditions, heatTransferCoefficient, hourlyHeatGains, hourlyHve, climate) {

    let tMass = thermalMass(settings.heat_capacity_type, settings.floor_area);

    let output = {};

    // first heating, then cooling
    for (let mode = 0; mode < 2; mode++) {
        let isHeating = (mode === 0);

        // make sure we start with the proper initial temps
        // NOTE: the first pass is always considered a weekday
        let endOfDaySetPoint = isHeating ? hourlyConditions[23].wd_heat_point : hourlyConditions[23].wd_cool_point;
        let initialTemps = new Array(12);
        for (let i = 0; i < initialTemps.length; i++) {
            initialTemps[i] = endOfDaySetPoint;
        }

        // run through the calculations hour by hour for each day in a hypothetical
        // week for each of the months in year.  done in the following order:
        // primer, tue/wed/thu/fri, sat, sun, mon
        let results = new Array(5);
        for (let d = 0; d < 5; d++) {
            let isWeekday = (d < 2 || d > 3);

            let setPointKey = "";
            if (isWeekday && isHeating) {
                setPointKey = "wd_heat_point";
            } else if (isWeekday && !isHeating) {
                setPointKey = "wd_cool_point";
            } else if (!isWeekday && isHeating) {
                setPointKey = "we_heat_point";
            } else {
                setPointKey = "we_cool_point";
            }

            // depending on the conditioning mode and day-of-week we can find out our set point boundary
            let setPointBoundary = 0;
            if (isHeating) {
                // we want the MAX set point when in heating mode
                setPointBoundary = hourlyConditions.reduce(function(acc, val) {
                    let maxSetPoint = Math.max(val.wd_heat_point, val.we_heat_point);
                    return (maxSetPoint > acc) ? maxSetPoint : acc
                }, 0);
            } else {
                // we want the MIN set point when in cooling mode
                setPointBoundary = hourlyConditions.reduce(function(acc, val) {
                    let minSetPoint = Math.min(val.wd_cool_point, val.we_cool_point);
                    return (minSetPoint < acc) ? minSetPoint : acc;
                }, 1000000);
            }

            // prep a data structure for the result
            let calcTemps = new Array(12);
            let normalizedTemps = new Array(12);
            for (let i = 0; i < calcTemps.length; i++) {
                calcTemps[i] = new Array(24);
                normalizedTemps[i] = new Array(24);
            }

            // hours within a day
            for (let h = 0; h < 24; h++) {
                let setPointTemp = hourlyConditions[h][setPointKey];
                let duration = 1;

                let newInitialTemps = new Array(12);

                // months within a year
                for (let m = 0; m < 12; m++) {
                    let HveData = isHeating ? hourlyHve[m].heating : hourlyHve[m].cooling;

                    let initialTemp = initialTemps[m];
                    let dryBulbTemp = climate[m].hourly_dry_bulb_temp[h];
                    let gains = isWeekday ? hourlyHeatGains[m].weekday[h] : hourlyHeatGains[m].weekend[h];
                    let Hve = isWeekday ? HveData.weekday[h] : HveData.weekend[h];

                    let computed = gains / (Hve + heatTransferCoefficient);

                    // do the calculation
                    let calcTemp = (initialTemp - dryBulbTemp - computed) * Math.exp(-(Hve + heatTransferCoefficient)/tMass * duration) + dryBulbTemp + computed;

                    // normalize the value against our set point boundary
                    let normalizedTemp = calcTemp;
                    if (isHeating) {
                        if (calcTemp < setPointTemp) {
                            normalizedTemp = setPointTemp;
                        } else if (calcTemp > setPointBoundary) {
                            normalizedTemp = setPointBoundary;
                        }

                    } else {
                        if (calcTemp > setPointTemp) {
                            normalizedTemp = setPointTemp;
                        } else if (calcTemp < setPointBoundary) {
                            normalizedTemp = setPointBoundary;
                        }
                    }

                    // record it all
                    calcTemps[m][h] = calcTemp;
                    normalizedTemps[m][h] = normalizedTemp;
                    newInitialTemps[m] = normalizedTemp;
                }

                // the temps we just calculated need to become the input for the next pass
                initialTemps = newInitialTemps;
            }

            // reduce the data into averages
            let calcAverages = new Array(12);
            let normalizedAverages = new Array(12);
            for (let i = 0; i < 12; i++) {
                calcAverages[i] = calcTemps[i].reduce((a, b) => a + b) / 24;
                normalizedAverages[i] = normalizedTemps[i].reduce((a, b) => a + b) / 24;
            }

            // capture the final result
            results[d] = {
                calcTemps,
                calcAverages,
                normalizedTemps,
                normalizedAverages
            };
        }

        // take the daily averages and aggregate them to monthly averages
        let finalAverages = new Array(12);
        for (let i = 0; i < 12; i++) {
            let mon = MONTHS[i];
            let total = mon.dow_cnt.reduce(function(tot, val, idx) {
                if (idx === 0) {
                    // sunday
                    return tot + (val * results[3].normalizedAverages[i]);
                } else if (idx === 1) {
                    // monday
                    return tot + (val * results[4].normalizedAverages[i]);
                } else if (idx === 6) {
                    // saturday
                    return tot + (val * results[2].normalizedAverages[i]);
                } else {
                    // tues/wed/thur/fri
                    return tot + (val * results[1].normalizedAverages[i]);
                }
            }, 0);
            finalAverages[i] = total / mon.days;
        }

        // pull together the full output
        if (isHeating) {
            output.heating = finalAverages;
        } else {
            output.cooling = finalAverages;
        }
    }

    return output;
}
