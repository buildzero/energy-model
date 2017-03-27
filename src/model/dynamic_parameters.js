
// Clause 12.x - Dynamic Parameters


// 12.2.1.1 (page 62) gainUtilizationFactor
export function gainUtilizationFactor(heatBalanceRatio, dimensionlessNumericalParameter) {
    // depending on our heat balance ratio, determine the final approach
    if (heatBalanceRatio === 1) {
        // == dimensionlessNumericalParameter / (dimensionlessNumericalParameter + 1)
        return dimensionlessNumericalParameter / (dimensionlessNumericalParameter + 1);

    } else if (heatBalanceRatio < 0) {
        // == 1 / heatBalanceRatio
        return 1 / heatBalanceRatio;

    } else {
        // == (1 - heatBalanceRatio^dimensionlessNumericalParameter) / (1 - heatBalanceRatio^(dimensionlessNumericalParameter + 1))
        return (1 - Math.pow(heatBalanceRatio, dimensionlessNumericalParameter)) / (1 - Math.pow(heatBalanceRatio, (dimensionlessNumericalParameter + 1)));
    }
}

// Building Inertia - 12.2.1.1/12.2.1.2 (page 62,64)
export function dimensionlessNumericalParameter(buildingTimeConstant) {
    // NOTE: these constants are specific to MONTHLY calculations
    return 1.0 + (buildingTimeConstant / 15);
}

// Building Time Constant - 12.2.1.3 (page 66)
// unit == hours
export function buildingTimeConstant(internalHeatCapacity, transmissionCoefficient, ventilationCoefficient) {
    return (internalHeatCapacity / 3600) / (transmissionCoefficient + ventilationCoefficient);
}

// 12.2.1.2 (page 72) lossUtilizationFactor
export function lossUtilizationFactor(heatBalanceRatio, dimensionlessNumericalParameter) {
    // depending on our heat balance ratio, determine the final approach
    if (heatBalanceRatio === 1) {
        // == dimensionlessNumericalParameter / (dimensionlessNumericalParameter + 1)
        return dimensionlessNumericalParameter / (dimensionlessNumericalParameter + 1);

    } else if (heatBalanceRatio < 0) {
        // == 1
        return 1;

    } else {
        // == (1 - heatBalanceRatio^-dimensionlessNumericalParameter) / (1 - heatBalanceRatio^-(dimensionlessNumericalParameter + 1))
        return (1 - Math.pow(heatBalanceRatio, -dimensionlessNumericalParameter)) / (1 - Math.pow(heatBalanceRatio, -(dimensionlessNumericalParameter + 1)));
    }
}
