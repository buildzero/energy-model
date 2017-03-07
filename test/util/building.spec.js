import {
    internalHeatCapacityByType,
    thermalMass,
    vsite,
    windowOpeningAngleCk,
    heatRecoveryEfficiency} from "util/building";

import {MathHelper} from "util/math";


describe("internalHeatCapacityByType", function() {
    it("can look up internal heat capacity", function() {
        expect(internalHeatCapacityByType("light")).toEqual(110000);
        expect(internalHeatCapacityByType("vheavy")).toEqual(370000);
        // default case
        expect(internalHeatCapacityByType("foobar")).toEqual(165000);
    });
});

describe("thermalMass", function() {
    it("can calculate thermal mass", function() {
        expect(MathHelper.round(thermalMass("heavy", 336), 2)).toEqual(24266.67);
    });
});


describe("vsite", function() {
    it("can look up vsite by terrain", function() {
        expect(vsite("open")).toEqual(1.0);
        expect(vsite("country")).toEqual(0.9);
        // default case
        expect(vsite("urban")).toEqual(0.8);
        expect(vsite("blah")).toEqual(0.8);
    });
});


describe("windowOpeningAngleCk", function() {
    it("can look up ck by window opening angle", function() {
        expect(windowOpeningAngleCk(62)).toEqual(0.74);
        expect(windowOpeningAngleCk(28)).toEqual(0.46);
        expect(windowOpeningAngleCk(14)).toEqual(0.25);
        expect(windowOpeningAngleCk(-14)).toEqual(0);
        // default case
        expect(windowOpeningAngleCk(175)).toEqual(1.0);
    });
});


describe("heatRecoveryEfficiency", function() {
    it("can look up heat recovery efficienty by type", function() {
        expect(heatRecoveryEfficiency("heat_exch")).toEqual(0.65);
        expect(heatRecoveryEfficiency("load_cooling")).toEqual(0.4);
        // default case
        expect(heatRecoveryEfficiency("none")).toEqual(0);
        expect(heatRecoveryEfficiency("badvalue")).toEqual(0);
    });
});
