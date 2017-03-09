import {heatGainInternal, heatGainSolar, indoorConditions} from "model/model";
import {MathHelper} from "util/math";

import {
    buildingSettings,
    buildingElements,
    climate,
    hourlyConditions,

    // results
    heatTransferCoeffiecient,
    heatTransferVentilationDetailed,
    internalGains,
    solarGains,
    totalGainsDetailed
} from "testdata/epc";



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
        for (var mon = 0; mon < 1; mon++) {
            expect(MathHelper.roundValues(indoorConditions(mon+1, buildingSettings, hourlyConditions, heatTransferCoeffiecient, totalGainsDetailed, heatTransferVentilationDetailed, climate), 0)).toEqual(solarGains[mon]);
        }
    });
});
