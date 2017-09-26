import {
    heatTransferByTransmission,
    heatTransferByTransmissionCoefficient
} from "thermal/transmission";

import {MONTHS} from "util/schedule";
import {MathHelper} from "util/math";

import {
    averageIndoorConditions,
    buildingElements,
    climate,
    heatTransferCoeffiecient,
    transmissionHeatTransfer
} from "testdata/epc";


describe("Transmission Heat Transfer", function() {
    it("can calculate transmission HT coefficient", function() {
        let walls = buildingElements.filter((elem) => elem.type === "wall" || elem.type === "roof");
        let windows = buildingElements.filter((elem) => elem.type === "window");

        expect(MathHelper.round(heatTransferByTransmissionCoefficient(walls, windows), 5)).toBe(heatTransferCoeffiecient);
    });

    for (let mon = 0; mon < 12; mon++) {
        it("can calculate transmission HT, mon="+mon, function() {
            let heating = heatTransferByTransmission(heatTransferCoeffiecient, averageIndoorConditions.heating[mon], climate[mon].temp, MONTHS[mon].megaseconds);
            let cooling = heatTransferByTransmission(heatTransferCoeffiecient, averageIndoorConditions.cooling[mon], climate[mon].temp, MONTHS[mon].megaseconds);
            
            // TODO: better decimal precision
            expect(heating).toHaveCloseValuesTo(transmissionHeatTransfer[mon].heating, 0);
            expect(cooling).toHaveCloseValuesTo(transmissionHeatTransfer[mon].cooling, 0);
        });
    }
});
