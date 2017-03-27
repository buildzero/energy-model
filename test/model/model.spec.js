
import {
    energyDemand,
    heatTransferVentilationCoefficient,
    heatGainInternal,
    heatGainSolar,
    indoorConditions
} from "model/model";

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
    let results = energyDemand(buildingSettings, hourlyConditions, buildingElements, climate);

    it("matches global results", function() {
        expect(results.global).toHaveCloseValuesTo(completeResult.global);
    });

    for (let mon = 0; mon < 12; mon++) {
        it("matches monthly results, month="+mon, function() {
            // expect(results.monthly[mon]).toHaveCloseValuesTo(completeResult.monthly[mon], 3);
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
