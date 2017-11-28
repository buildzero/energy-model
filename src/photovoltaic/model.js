import * as math from "util/math";


/*  =================================================================================
    Calculate the monthly output of a Photovoltaic array (kWh) over a single year 
    given a specific latitude, irradiance data, and array/module characteristics.

    Provided by Christopher Gronbeck (susdesign.com) for BuildZero.org, Nov. 22, 2017
    ================================================================================= */


const DAYS_PER_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const month_elapsed_days = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
const default_day_of_month = 15;
const average_extraterrestrial_radiation = 1367;
const ground_reflectance = 0.2;


export function energyDelivered(latitude, climateData, pvSettings) {
    
    // simply apply our monthly calcs and collect the results in an array
    return DAYS_PER_MONTH.map((daysInMonth, month) => {
        return energyDeliveredForMonth(month, daysInMonth, latitude, climateData[month], pvSettings);
    });
}


function energyDeliveredForMonth(month, daysInMonth, latitude, climateData, pvSettings) {
    let { ghi, dhi, dni } = climateData;
    let { azimuth, tilt, nominalPower, numModules, systemLosses } = pvSettings;

    // get total daily irradiance (we do this for a single representative day in the given month)
    let dailyIrradiance = 0;
    for (let hour = 0; hour < 24; hour++) {
        dailyIrradiance += Calculate_Surface_Irradiance(month, hour, latitude, ghi[hour], dhi[hour], dni[hour], azimuth, tilt) / 1000;
    }

    // calculate module power at design temperature
    let dailyEnergyPerModule = dailyIrradiance * (nominalPower / 1000);

    // TODO: correct for cell temperature

    // correct for systems losses
    dailyEnergyPerModule *= (1 - systemLosses);

    // multiply by number of modules
    const dailyEnergyForArray = dailyEnergyPerModule * numModules;

    // multiply by days per month
    return dailyEnergyForArray * daysInMonth;
}


function Calculate_Surface_Irradiance(month, hour, latitude, ghi, dhi, dni, azimuth, tilt) {

    // ---------------------------------------------
    // get day & time
    // ---------------------------------------------

    const day_of_year = month_elapsed_days[month] + default_day_of_month;

    // ---------------------------------------------
    // calculate declination
    // ---------------------------------------------            

    const declination = Calculate_Declination(day_of_year);

    // ---------------------------------------------
    // calculate hour angle
    // ---------------------------------------------

    const hour_angle = 15 * (hour - 12);

    // ---------------------------------------------
    // calculate altitude angle
    // ---------------------------------------------

    let altitude_angle = math.ArcSine((math.Sine(latitude) * math.Sine(declination)) - (math.Cosine(latitude) * math.Cosine(declination) * math.Cosine((hour_angle + 180))));

    // ---------------------------------------------
    // no irradiance if sun below horizon
    // ---------------------------------------------

    if (altitude_angle < 0) return 0;

    // ---------------------------------------------
    // calculate azimuth angle
    // ---------------------------------------------
    let azimuth_angle;
    if (hour_angle == 0) {

        if (latitude >= declination) azimuth_angle = 0;

        else azimuth_angle = 180;
    }

    else {

        azimuth_angle = math.ArcCosine(((math.Sine(altitude_angle) * math.Sine(latitude)) - math.Sine(declination)) / (math.Cosine(altitude_angle) * math.Cosine(latitude)));
    }

    if (hour_angle < 0) {

        azimuth_angle = azimuth_angle * -1;
    }

    // ---------------------------------------------
    // convert module orientation
    // ---------------------------------------------

    // convert from deg relative to N/S to deg clockwise from south

    // northern hemisphere
    let normalized_module_orientation;
    if (latitude >= 0) {

        if (azimuth > 0) normalized_module_orientation = azimuth;

        else normalized_module_orientation = 360 + azimuth;
    }

    // southern hemisphere

    else {

        if (azimuth > 0) normalized_module_orientation = 180 - azimuth;

        else normalized_module_orientation = 180 - azimuth;
    }


    // ---------------------------------------------
    // calculate surface-solar azimuth
    // ---------------------------------------------

    let solar_surface_azimuth = azimuth_angle - normalized_module_orientation;

    if (solar_surface_azimuth > 180) solar_surface_azimuth -= 360;
    if (solar_surface_azimuth < -180) solar_surface_azimuth += 360;
    if (solar_surface_azimuth < 0) solar_surface_azimuth *= -1;

    // ---------------------------------------------
    // angle of incidence
    // ---------------------------------------------

    const angle_of_incidence = math.ArcCosine(math.Cosine(tilt) * math.Sine(altitude_angle) + math.Sine(tilt) * math.Cosine(altitude_angle) * math.Cosine(solar_surface_azimuth));

    // ---------------------------------------------
    // surface irradiance: direct
    // ---------------------------------------------
    let irradiance_direct_surface;
    if (angle_of_incidence < 90) irradiance_direct_surface = dni * math.Cosine(angle_of_incidence);

    else irradiance_direct_surface = 0;

    // ---------------------------------------------
    // correct direct beam for module glass reflectivity
    // ---------------------------------------------

    const glass_reflectivity_losses = 1.04 * Math.pow((1 - math.Cosine(angle_of_incidence)), 5) * irradiance_direct_surface;

    if (glass_reflectivity_losses > 0) irradiance_direct_surface -= glass_reflectivity_losses;

    if (irradiance_direct_surface < 0) irradiance_direct_surface = 0;

    // ---------------------------------------------
    // surface irradiance: diffuse
    // ---------------------------------------------

    const anisotropy_index = dni / average_extraterrestrial_radiation;

    const irradiance_diffuse_surface = dhi * (anisotropy_index * math.Cosine(angle_of_incidence) + (1 - anisotropy_index) * (1 + math.Cosine(tilt) / 2));

    // ---------------------------------------------
    // surface irradiance: reflected
    // ---------------------------------------------

    const irradiance_reflected_surface = ghi * ground_reflectance * (1 - math.Cosine(tilt)) / 2;

    // ---------------------------------------------
    // surface irradiance: total
    // ---------------------------------------------

    const irradiance_total_surface = irradiance_direct_surface + irradiance_diffuse_surface + irradiance_reflected_surface;

    // ---------------------------------------------
    // return surface irradiance
    // ---------------------------------------------

    return irradiance_total_surface;
}


function Calculate_Declination(day_of_year) {
    return 23.45 * math.Sine(360 / 365 * (284 + day_of_year));
}
