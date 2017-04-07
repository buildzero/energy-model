
// Clause 11.x - Solar Heat Gains (pages 53-61)


// 11.3.2 - Heat flow by solar gains per building element (page 55)
// unit = watts
//
// Input:
//  * shade reduction factor (0-1)
//  * effective collecting area (m2)
//  * solar irradiance for the given climate time of year & orientation
//  * form factor between building element and sky (0-1)
//  * radiation to sky (W)
//
// Output:
//  * solar gains (watts)
export function solarHeatFlowRateForElement(shadeReductionFactor, effectiveCollectingArea, solarIrradiance, formFactor, radiationToSky) {
    // Φsol,k = Fsh,ob,k * Asol,k * Isol,k − (Fr,k * Φr,k)
    return (shadeReductionFactor * effectiveCollectingArea * solarIrradiance) - (formFactor * radiationToSky);
}


// 11.3.3 - Effective solar collecting area of glazed elements (page 56)
// unit = m2 (square meters)
//
// Input:
//  * area of the element (m2)
//  * frame area fraction (0-1)
//  * solar energy transmittance
//  * shade reduction factor (0-1)
//
// Output:
//  * effective collecting area (m2)
export function effectiveSolarCollectingAreaForGlazedElement(area, frameAreaFraction, solarTransmittance, shadeReductionFactor) {
    // Asol = Fsh,gl * ggl * (1 − FF) * Aw,p
    return shadeReductionFactor * solarTransmittance * (1.0 - frameAreaFraction) * area;
}


// 11.3.4 - Effective solar collecting area of opaque building elements (page 56)
// unit = m2 (square meters)
//
// Input:
//  * area (m2)
//  * u-value (thermal transmittance) per ISO 6946 (W/m2*K)
//  * thermal absorptivity (W/m2*K)
//  * surface heat resistance (m2*K/W)
//
// Output:
//  * effective collecting area (m2)
export function effectiveSolarCollectingAreaForOpaqueElement(area, UValue, thermalAbsorptivity, surfaceHeatResistance) {
    // Asol = αS,c * Rse * Uc * Ac
    return thermalAbsorptivity * surfaceHeatResistance * UValue * area;
}


// 11.3.5 - Thermal radiation to the sky (page 57)
// unit = watts
//
// Input:
//  * area (m2)
//  * u-value (thermal transmittance) per ISO 6946 (W/m2*K)
//  * thermal emissivity (W/m2*K)
//  * surface heat resistance (m2*K/W)
//  * avg ambient air temperature (C)
//  * avg sky temperature (C)
//
// Output:
//  * thermal radiation to the sky (watts)
// 31.5, 3.09, 0.84, 0.04, 4, 260.32
export function thermalRadiationToSky(area, UValue, thermalEmissivity, surfaceHeatResistance, avgTemperature, skyTemperature) {
    // Φr = Rse * Uc * Ac * hr * ∆θer

    // 11.4.6 - external radiative heat transfer coefficient
    // TODO: we can calculate this in a more detailed fashion with more data
    // default provided says to use 5.0 * thermal emissivity value
    let radiativeHeatCoeff = 5.0 * thermalEmissivity;

    // Average difference between air temperature and sky temperature.
    // defaults can be 9K in sub-polar areas, 13K in the tropics, and 11K in intermediate zones.
    let skyToAirTemperatureDelta = (avgTemperature + 273.15) - skyTemperature;

    return surfaceHeatResistance * UValue * area * radiativeHeatCoeff * skyToAirTemperatureDelta;
}
