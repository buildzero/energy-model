import _ from "underscore";

import {
    energyDemand,
    heatTransferVentilationCoefficient,
    heatGainInternal,
    heatGainSolar,
    indoorConditions
} from "model/model";

import { MONTHS } from "util/schedule";

import {
    buildingSettings,
    buildingElements,
    climate,
    hourlyConditions,

    // results
    heatTransferCoeffiecient,
    ventilationCoefficientDetailed,
    internalGains,
    solarGains,
    totalGainsDetailed,
    averageIndoorConditions,
    completeResult
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

describe("Total Calculation", function() {
    let results = energyDemand(buildingSettings, hourlyConditions, buildingElements, climate);

    it("matches global results", function() {
        expect(results.global).toHaveCloseValuesTo(completeResult.global);
    });

    for (let mon = 0; mon < 12; mon++) {
        it("matches monthly results, month="+mon, function() {
            // expect(results.monthly[mon]).toHaveCloseValuesTo(completeResult.monthly[mon], 3);
        });
    }
});

describe("Ventilation Heat Transfer", function() {
    for (let mon = 0; mon < 12; mon++) {
        it("can calculate ventilation coefficient, month="+mon, function() {
            let coeffs = heatTransferVentilationCoefficient(MONTHS[mon], buildingSettings, hourlyConditions, climate[mon]);
            expect(coeffs).toHaveCloseValuesTo(ventilationCoefficientDetailed[mon], 3);
        });
    }
});


describe("Internal Gains", function() {
    for (let mon = 0; mon < 12; mon++) {
        it("can calculate internal gains, month="+mon, function() {
            // TODO: better decimal precision
            let gains = heatGainInternal(MONTHS[mon], hourlyConditions, buildingSettings);
            expect(gains).toHaveCloseValuesTo(internalGains[mon], 0);
        });
    }
});


describe("Solar Gains", function() {
    // separate walls from windows
    let walls = buildingElements.filter((elem) => elem.type === "wall" || elem.type === "roof");
    let windows = buildingElements.filter((elem) => elem.type === "window");

    for (let mon = 0; mon < 12; mon++) {
        it("can calculate solar gains, month="+mon, function() {
            let gains = heatGainSolar(MONTHS[mon], climate[mon], walls, windows);
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
