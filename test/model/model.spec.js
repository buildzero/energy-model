import _ from "underscore";

import {
    heatTransferTransmission,
    heatTransferVentilationCoefficient,
    heatGainInternal,
    heatGainSolar,
    indoorConditions
} from "model/model";

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


function toHaveCloseValuesTo(actual, expected, precision) {
    if (precision !== 0) {
        precision = precision || 2;
    }

    if (Array.isArray(expected)) {
        if (!Array.isArray(actual)) {
            return {pass: false, message: "Expected an array but got a '"+typeof(actual)+"'"};
        } else if (expected.length !== actual.length) {
            return {pass: false, message: "Expected array of length "+expected.length+" but actual array was of length "+actual.length};
        } else {
            // recur for each array index
            let results = expected.map((v, i) => toHaveCloseValuesTo(expected[i], actual[i], precision));
            let error = _.find(results, (r) => r.pass === false);
            
            if (error) {
                return error;
            } else {
                return {pass: true};
            }
        }

    } else if (typeof(expected) === "object") {
        // recur for each key
        let results = Object.keys(expected).map((k) => toHaveCloseValuesTo(expected[k], actual[k], precision));
        let error = _.find(results, (r) => r.pass === false);

        if (error) {
            return error;
        } else {
            return {pass: true};
        }

    } else if (_.isNumber(expected)) {
        return {
            pass: Math.abs(expected - actual) < (Math.pow(10, -precision) / 2)
        };

    } else if (_.isString(expected)) {
        return {
            pass: expected === actual
        };

    } else {
        return {
            pass: false,
            message: "Expected value type of '"+typeof(expected)+"' is not an object, array, or number.  Use a different comparitor!"
        }
    }
}

beforeEach(function(){
    jasmine.addMatchers({
        toHaveCloseValuesTo: function(util, customEqualityTesters) {
            return {
                compare: toHaveCloseValuesTo
            };
        }
    });
});


describe("Transmission Heat Transfer", function() {
    for (let mon = 0; mon < 12; mon++) {
        it("can calculate transmission HT, month="+mon, function() {
            let transmissionHT = heatTransferTransmission(mon+1, averageIndoorConditions.heating[mon], averageIndoorConditions.cooling[mon], climate[mon], heatTransferCoeffiecient);
            expect(transmissionHT).toHaveCloseValuesTo(transmissionHeatTransfer[mon], 3);
        });
    } 
});

describe("Ventilation Heat Transfer", function() {
    for (let mon = 0; mon < 12; mon++) {
        it("can calculate ventilation coefficient, month="+mon, function() {
            let coeffs = heatTransferVentilationCoefficient(mon+1, buildingSettings, hourlyConditions, climate[mon]);
            expect(coeffs).toHaveCloseValuesTo(ventilationCoefficientDetailed[mon], 3);
        });
    }
});


describe("Internal Gains", function() {
    for (let mon = 0; mon < 12; mon++) {
        it("can calculate internal gains, month="+mon, function() {
            // TODO: better decimal precision
            let gains = heatGainInternal(mon+1, hourlyConditions, buildingSettings);
            expect(gains).toHaveCloseValuesTo(internalGains[mon], 0);
        });
    }
});


describe("Solar Gains", function() {
    for (let mon = 0; mon < 12; mon++) {
        it("can calculate solar gains, month="+mon, function() {
            let gains = heatGainSolar(mon+1, climate[mon], buildingElements);
            expect(gains).toHaveCloseValuesTo(solarGains[mon], 3);
        });
    }
});

describe("Indoor Conditions", function() {
    it("can calculate indoor set point conditions", function() {
        let conditions = indoorConditions(buildingSettings, hourlyConditions, heatTransferCoeffiecient, totalGainsDetailed, ventilationCoefficientDetailed, climate);
        expect(conditions).toHaveCloseValuesTo(averageIndoorConditions, 3);
    });
});
