import {
    solarHeatFlowRateForElement,
    effectiveSolarCollectingAreaForGlazedElement,
    effectiveSolarCollectingAreaForOpaqueElement,
    thermalRadiationToSky
} from 'thermal/solar';
import {MathHelper} from "util/math";


describe("Solar Gains", function() {
    // Radiation to Sky
    it("can calculate thermal radiation to sky", function() {
        expect(MathHelper.round(thermalRadiationToSky(31.5, 3.09, 0.84, 0.04, 4, 260.32), 2)).toBe(275.21);
    });

    // Opaque Element
    it("can calculate effective collecting area (opaque)", function() {
        expect(MathHelper.round(effectiveSolarCollectingAreaForOpaqueElement(73.5, 0.35, 0.7, 0.04), 2)).toBe(0.72);
    });

    // Glazed Element
    it("can calculate effective collecting area (glazed)", function() {
        expect(MathHelper.round(effectiveSolarCollectingAreaForGlazedElement(31.5, 0.3, 0.7 * 0.92, 1.0), 2)).toBe(14.20);
    });

    // Heat Flow Rate
    it("can calculate solar heat flow rate", function() {
        expect(MathHelper.round(solarHeatFlowRateForElement(1.0, 14.20, 166, 0.5, 275.21), 2)).toBe(2219.59);
    });
});
