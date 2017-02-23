import {heatGainInternal, heatGainSolar} from "model/model";
import {MathHelper} from "util/math";

import {
    buildingSettings,
    buildingElements,
    climate,
    dailyUsage,

    // results
    internalGains
} from "testdata/epc";


describe("Heat Transfer Transmission", function() {
    it("can calculate heat transfer transmission monthly", function() {
        expect(MathHelper.round(heatGainSolar(1, climate[0], buildingElements), 0)).toEqual(9903);
        expect(MathHelper.round(heatGainSolar(2, climate[1], buildingElements), 0)).toEqual(9470);
        expect(MathHelper.round(heatGainSolar(3, climate[2], buildingElements), 0)).toEqual(12339);
        expect(MathHelper.round(heatGainSolar(4, climate[3], buildingElements), 0)).toEqual(11950);
        expect(MathHelper.round(heatGainSolar(5, climate[4], buildingElements), 0)).toEqual(11947);
        expect(MathHelper.round(heatGainSolar(6, climate[5], buildingElements), 0)).toEqual(11003);
        expect(MathHelper.round(heatGainSolar(7, climate[6], buildingElements), 0)).toEqual(11586);
        expect(MathHelper.round(heatGainSolar(8, climate[7], buildingElements), 0)).toEqual(12488);
        expect(MathHelper.round(heatGainSolar(9, climate[8], buildingElements), 0)).toEqual(10802);
        expect(MathHelper.round(heatGainSolar(10, climate[9], buildingElements), 0)).toEqual(11365);
        expect(MathHelper.round(heatGainSolar(11, climate[10], buildingElements), 0)).toEqual(10180);
        expect(MathHelper.round(heatGainSolar(12, climate[11], buildingElements), 0)).toEqual(9594);
    });
});


describe("Internal Gains", function() {
    it("can calculate internal gains monthly", function() {
        for (var mon = 0; mon < 12; mon++) {
            expect(MathHelper.roundValues(heatGainInternal(mon+1, dailyUsage, buildingSettings), 0)).toEqual(internalGains[mon]);
        }
    });
});


describe("Solar Gains", function() {
    it("can calculate solar gains monthly", function() {
        // NOTE: we diverge from the EPC data here because I believe they have some rounding errors in their sheet
        expect(MathHelper.round(heatGainSolar(1, climate[0], buildingElements), 0)).toEqual(9903);
        expect(MathHelper.round(heatGainSolar(2, climate[1], buildingElements), 0)).toEqual(9470);
        expect(MathHelper.round(heatGainSolar(3, climate[2], buildingElements), 0)).toEqual(12339);
        expect(MathHelper.round(heatGainSolar(4, climate[3], buildingElements), 0)).toEqual(11950);
        expect(MathHelper.round(heatGainSolar(5, climate[4], buildingElements), 0)).toEqual(11947);
        expect(MathHelper.round(heatGainSolar(6, climate[5], buildingElements), 0)).toEqual(11003);
        expect(MathHelper.round(heatGainSolar(7, climate[6], buildingElements), 0)).toEqual(11586);
        expect(MathHelper.round(heatGainSolar(8, climate[7], buildingElements), 0)).toEqual(12488);
        expect(MathHelper.round(heatGainSolar(9, climate[8], buildingElements), 0)).toEqual(10802);
        expect(MathHelper.round(heatGainSolar(10, climate[9], buildingElements), 0)).toEqual(11365);
        expect(MathHelper.round(heatGainSolar(11, climate[10], buildingElements), 0)).toEqual(10180);
        expect(MathHelper.round(heatGainSolar(12, climate[11], buildingElements), 0)).toEqual(9594);
    });
});
