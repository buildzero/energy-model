import { energyDelivered } from "photovoltaic/model";
import pvCases from "testdata/pvCases";


describe("Photovoltaic Calculations", function() {

    it("can calculate PV power delivered", function() {
        pvCases.forEach((pv) => {
            expect(energyDelivered(pv.latitude, pv.climate, pv.settings)).toHaveCloseValuesTo(pv.expected);
        });
    });

});