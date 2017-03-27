
import _ from "underscore";


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