import {
    heatTransferTransmission,
    heatTransferVentilationCoefficient,
    heatGainInternal,
    heatGainSolar,
    indoorConditions
} from "model/model";

import {MathHelper} from "util/math";

import {
    buildingSettings,
    buildingElements,
    climate,
    hourlyConditions,

    // results
    heatTransferCoeffiecient,
    transmissionHeatTransfer,
    ventilationCoefficientDetailed,
    internalGains,
    solarGains,
    totalGainsDetailed,
    averageIndoorConditions
} from "testdata/epc";



describe("Transmission Heat Transfer", function() {
    it("can calculate transmission HT monthly", function() {
        for (var mon = 0; mon < 12; mon++) {
            expect(MathHelper.roundValues(heatTransferTransmission(mon+1, averageIndoorConditions.heating[mon], averageIndoorConditions.cooling[mon], climate[mon], heatTransferCoeffiecient), 4)).toEqual(transmissionHeatTransfer[mon]);
        }
    });
});

describe("Ventilation Heat Transfer", function() {
    // TODO: re-enable this when we get the values lined up
    // it("can calculate ventilation HT coefficient monthly", function() {
    //     for (var mon = 0; mon < 12; mon++) {
    //         expect(MathHelper.roundValues(heatTransferVentilationCoefficient(mon+1, buildingSettings, hourlyConditions, climate[mon]), 4)).toEqual(ventilationCoefficientDetailed[mon]);
    //     }
    // });

    it("can calculate ventilation coefficient monthly averages", function() {
        for (var mon = 0; mon < 12; mon++) {
            let coeffs = heatTransferVentilationCoefficient(mon+1, buildingSettings, hourlyConditions, climate[mon]);

            expect(MathHelper.round(coeffs.heating.average, 4)).toEqual(ventilationCoefficientDetailed[mon].heating.average);
            expect(MathHelper.round(coeffs.cooling.average, 4)).toEqual(ventilationCoefficientDetailed[mon].cooling.average);
        }
    });
});


describe("Internal Gains", function() {
    it("can calculate internal gains monthly", function() {
        for (var mon = 0; mon < 12; mon++) {
            expect(MathHelper.roundValues(heatGainInternal(mon+1, hourlyConditions, buildingSettings), 0)).toEqual(internalGains[mon]);
        }
    });
});


describe("Solar Gains", function() {
    it("can calculate solar gains monthly", function() {
        for (var mon = 0; mon < 1; mon++) {
            expect(MathHelper.roundValues(heatGainSolar(mon+1, climate[mon], buildingElements), 0)).toEqual(solarGains[mon]);
        }
    });
});

describe("Indoor Conditions", function() {
    it("can calculate indoor set point conditions", function() {
        expect(MathHelper.roundValues(indoorConditions(buildingSettings, hourlyConditions, heatTransferCoeffiecient, totalGainsDetailed, ventilationCoefficientDetailed, climate), 4)).toEqual(averageIndoorConditions);
    });
});
