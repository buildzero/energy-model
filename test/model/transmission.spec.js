import {
    heatTransferByTransmissionCoefficient
} from "model/transmission";
import {MathHelper} from "util/math";

import {buildingElements, heatTransferCoeffiecient} from "testdata/epc";

describe("Transmission Heat Transfer", function() {
    it("can calculate heat transfer coefficient", function() {
        let walls = buildingElements.filter((elem) => elem.type === "wall" || elem.type === "roof");
        let windows = buildingElements.filter((elem) => elem.type === "window");

        expect(MathHelper.round(heatTransferByTransmissionCoefficient(walls, windows), 5)).toBe(heatTransferCoeffiecient);
    });
});
