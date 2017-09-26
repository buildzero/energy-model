
import {
    thermalDemand,
    heatTransferVentilationCoefficient,
    heatGainInternal,
    heatGainSolar,
    indoorConditions
} from "thermal/model";

import { MONTHS } from "util/schedule";

import {
    buildingSettings,
    buildingElements,
    climate,
    hourlyConditions,

    // results
    heatTransferCoeffiecient,
    ventilationCoefficientDetailed,
    internalGains,
    solarGains,
    totalGainsDetailed,
    averageIndoorConditions,
    completeResult
} from "testdata/epc";


describe("Total Calculation", function() {
    let results = thermalDemand(buildingSettings, hourlyConditions, buildingElements, climate);
    
    it("matches global results", function() {
        expect(results.global).toHaveCloseValuesTo(completeResult.global);
    });

    for (let mon = 0; mon < 12; mon++) {
        it("matches monthly results, month="+mon, function() {
            // TODO: better decimal precision on some of these

            // gains
            expect(results.monthly[mon].internalGain).toHaveCloseValuesTo(completeResult.monthly[mon].internalGain, 0);
            expect(results.monthly[mon].solarGain).toHaveCloseValuesTo(completeResult.monthly[mon].solarGain, 3);
            expect(results.monthly[mon].totalGain).toHaveCloseValuesTo(completeResult.monthly[mon].totalGain, 0);
            expect(results.monthly[mon].totalGainHourly).toHaveCloseValuesTo(completeResult.monthly[mon].totalGainHourly, 0);

            // transfers
            expect(results.monthly[mon].ventilationTransferCoeffs).toHaveCloseValuesTo(completeResult.monthly[mon].ventilationTransferCoeffs, 3);
            expect(results.monthly[mon].ventilationTransfer).toHaveCloseValuesTo(completeResult.monthly[mon].ventilationTransfer, 2);
            expect(results.monthly[mon].transmissionTransfer).toHaveCloseValuesTo(completeResult.monthly[mon].transmissionTransfer, 2);
            expect(results.monthly[mon].totalTransfer).toHaveCloseValuesTo(completeResult.monthly[mon].totalTransfer, 2);

            // dynamic params
            expect(results.monthly[mon].dynamicParameters).toHaveCloseValuesTo(completeResult.monthly[mon].dynamicParameters, 3);

            // final energy demand totals
            expect(results.monthly[mon].energyForHeating).toHaveCloseValuesTo(completeResult.monthly[mon].energyForHeating, 2);
            expect(results.monthly[mon].energyForCooling).toHaveCloseValuesTo(completeResult.monthly[mon].energyForCooling, 2);
        });
    }
});

describe("Ventilation Heat Transfer", function() {
    for (let mon = 0; mon < 12; mon++) {
        it("can calculate ventilation coefficient, month="+mon, function() {
            let coeffs = heatTransferVentilationCoefficient(MONTHS[mon], buildingSettings, hourlyConditions, climate[mon]);
            expect(coeffs).toHaveCloseValuesTo(ventilationCoefficientDetailed[mon], 3);
        });
    }
});


describe("Internal Gains", function() {
    for (let mon = 0; mon < 12; mon++) {
        it("can calculate internal gains, month="+mon, function() {
            // TODO: better decimal precision
            let gains = heatGainInternal(MONTHS[mon], hourlyConditions, buildingSettings);
            expect(gains).toHaveCloseValuesTo(internalGains[mon], 0);
        });
    }
});


describe("Solar Gains", function() {
    // separate walls from windows
    let walls = buildingElements.filter((elem) => elem.type === "wall" || elem.type === "roof");
    let windows = buildingElements.filter((elem) => elem.type === "window");

    for (let mon = 0; mon < 12; mon++) {
        it("can calculate solar gains, month="+mon, function() {
            let gains = heatGainSolar(MONTHS[mon], climate[mon], walls, windows);
            expect(gains).toHaveCloseValuesTo(solarGains[mon], 3);
        });
    }
});

describe("Indoor Conditions", function() {
    it("can calculate indoor set point conditions", function() {
        let conditions = indoorConditions(buildingSettings, hourlyConditions, heatTransferCoeffiecient, totalGainsDetailed, ventilationCoefficientDetailed, climate);
        expect(conditions).toHaveCloseValuesTo(averageIndoorConditions, 3);
    });
});
