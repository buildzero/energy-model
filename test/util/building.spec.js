import {internalHeatCapacityByType} from "util/building";


describe("internalHeatCapacityByType", function() {
    it("can look up internal heat capacity", function() {
        expect(internalHeatCapacityByType("light")).toEqual(110000);
        expect(internalHeatCapacityByType("vheavy")).toEqual(370000);
        // default case
        expect(internalHeatCapacityByType("foobar")).toEqual(165000);
    });
});
