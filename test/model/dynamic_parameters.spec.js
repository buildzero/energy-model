import {
    dimensionlessNumericalParameter,
    buildingTimeConstant,
    gainUtilizationFactor,
    lossUtilizationFactor
} from "model/dynamic_parameters";

import {
    buildingHeatCapacity,
    heatTransferCoeffiecient, 
    ventilationCoefficientDetailed,
    dynamicParameters,
    totalHeatTransfer,
    totalGains
} from "testdata/epc";


describe("Dynamic Parameters", function() {

    for (let mon = 0; mon < 12; mon++) {
        it("can calculate building time constant, mon="+mon, function() {
            let heating = buildingTimeConstant(buildingHeatCapacity, heatTransferCoeffiecient, ventilationCoefficientDetailed[mon].heating.average);
            let cooling = buildingTimeConstant(buildingHeatCapacity, heatTransferCoeffiecient, ventilationCoefficientDetailed[mon].cooling.average);
            
            expect(heating).toHaveCloseValuesTo(dynamicParameters[mon].heating.buildingTimeConstant, 4);
            expect(cooling).toHaveCloseValuesTo(dynamicParameters[mon].cooling.buildingTimeConstant, 4);
        });

        it("can calculate dimensionless numerical parameter, mon="+mon, function() {
            let heating = dimensionlessNumericalParameter(dynamicParameters[mon].heating.buildingTimeConstant);
            let cooling = dimensionlessNumericalParameter(dynamicParameters[mon].cooling.buildingTimeConstant);
            
            expect(heating).toHaveCloseValuesTo(dynamicParameters[mon].heating.dimensionlessNumericalParameter, 4);
            expect(cooling).toHaveCloseValuesTo(dynamicParameters[mon].cooling.dimensionlessNumericalParameter, 4);
        });

        it("can calculate gain/loss utilization factors, mon="+mon, function() {
            let heating = gainUtilizationFactor(totalGains[mon] / totalHeatTransfer[mon].heating, dynamicParameters[mon].heating.dimensionlessNumericalParameter);
            let cooling = lossUtilizationFactor(totalGains[mon] / totalHeatTransfer[mon].cooling, dynamicParameters[mon].cooling.dimensionlessNumericalParameter);
            
            expect(heating).toHaveCloseValuesTo(dynamicParameters[mon].heating.utilizationFactor, 4);
            expect(cooling).toHaveCloseValuesTo(dynamicParameters[mon].cooling.utilizationFactor, 4);
        });
    }
});
