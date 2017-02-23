
// Clause 12.x - Dynamic Parameters


// 12.2.1.1 (page 62) gainUtilizationFactor
function gainUtilizationFactor(heatBalanceRatio, heatingHeatGains, heatingHeatTransfer) {
    // next calculate the building time constant
    let buildingTimeConstant = buildingTimeConstant();

    // finally we calculate the building inertia coefficient
    let buildingInertia = buildingInertia(buildingTimeConstant);

    // depending on our heat balance ratio, determine the final approach
    if (heatBalanceRatio === 1) {
        // == buildingInertia / (buildingInertia + 1)
    } else if (heatBalanceRatio > 0) {
        // == 1 / buildingInertia
    } else {
        // == (1 - heatBalanceRatio^buildingInertia) / (1 - heatBalanceRatio^(buildingInertia + 1))
    }
}

// Building Inertia - 12.2.1.1/12.2.1.2 (page 62,64)
function buildingInertia(buildingTimeConstant) {
    // NOTE: these constants are specific to MONTHLY calculations
    return 1.0 + (buildingTimeConstant / 15);
}

// Internal heat capacity of the building - 12.3.1.1 (page 67)
// unit = J/K (joules/kelvin)
function internalHeatCapacity(buildingEnvelope) {
    // sum the internal heat capacity of each building element in contact w/ internal air

    // defaults for element heat capacities
    // very light = 80000 * areaOfElement
    // light = 110000 * areaOfElement
    // medium = 165000 * areaOfElement
    // heavy = 260000 * areaOfElement
    // very heavy = 370000 * areaOfElement
}

// Building Time Constant - 12.2.1.3 (page 66)
// Characterizes the internal thermal inertia of the conditioned zone
// == (internalHeatCapacity * 3600) / (heatTransferCoefficientByTransmissionAdjusted + heatTransferCoefficientByVentilationAdjusted)
// unit == hours
function buildingTimeConstant(internalHeatCapacity, representativeHeatTransferCoefficientByTransmission, representativeHeatTransferCoefficientByVentilation) {
    // the values for heat transfer coefficients used here are meant to be representative of the dominating season,
    // so it should be values for a mid-winter month in the case of a heating dominated climate, or it should be a mid-summer
    // month in the case of a cooling dominated climate
    return (internalHeatCapacity / 3600) / (representativeHeatTransferCoefficientByTransmission + representativeHeatTransferCoefficientByVentilation);
}

// 12.2.1.2 (page 72) lossUtilizationFactor
function lossUtilizationFactor(heatBalanceRatio) {

}
