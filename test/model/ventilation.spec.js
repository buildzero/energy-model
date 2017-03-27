import {
    heatTransferByVentilation,
    airInfiltrationRate,
    mechanicalVentilationRate,
    naturalVentilationRate} from "model/ventilation";

import {averageIndoorConditions, climate, ventilationCoefficientDetailed, ventilationHeatTransfer} from "testdata/epc";

import {MathHelper} from "util/math";
import {MONTHS} from "util/schedule";


describe("Ventilation Heat Transfer", function() {

    // Ventilation Heat Transfer
    for (let mon = 0; mon < 12; mon++) {
        it("can calculate ventilation HT, mon="+mon, function() {
            let heating = heatTransferByVentilation(ventilationCoefficientDetailed[mon].heating.average, averageIndoorConditions.heating[mon], climate[mon].temp, MONTHS[mon].megaseconds);
            let cooling = heatTransferByVentilation(ventilationCoefficientDetailed[mon].cooling.average, averageIndoorConditions.cooling[mon], climate[mon].temp, MONTHS[mon].megaseconds);
            
            // TODO: better decimal precision
            expect(heating).toHaveCloseValuesTo(ventilationHeatTransfer[mon].heating, 1);
            expect(cooling).toHaveCloseValuesTo(ventilationHeatTransfer[mon].cooling, 1);
        });
    }

    // Mechanical Ventilation
    it("can calculate mechanical ventilation rates", function() {
        expect(MathHelper.roundValues(mechanicalVentilationRate(0.37, 336, 168), 2)).toEqual({
            mechanicalSupplyRate: 1.8,
            mechanicalSupplyRateAvg: 0.67,
            mechanicalExhaustRate: 1.8,
            mechanicalExhaustRateAvg: 0.67
        });
    });

    // Natural Ventilation
    it("can calculate natural ventilation rates", function() {
        expect(MathHelper.roundValues(naturalVentilationRate(100, 1, 7.5, 336, 21, 4, 4.6, 0.0013), 2)).toEqual({
            V: 0.48,
            YWind: 0.54,
            YTemp: 0.36,
            Ropw: 0.19,
            qv_airing: 0.09
        });
    });

    // Infiltration
    it("can calculate infiltration rates", function() {
        expect(MathHelper.roundValues(airInfiltrationRate(1.1, 7.5, 21, 4, 4.6, 1.8, 1.8, 0.8), 2)).toEqual({
            qv_stack: 0.32,
            qv_wind: 0.46,
            qv_sw: 0.48,
            qv_inf: 0.48
        });
    });
});
