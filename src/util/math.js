import _ from "underscore";


function roundNumber(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
};

function roundValues(obj, precision) {
    return _.mapObject(obj, function (v, k) {
        if (_.isNumber(v)) {
            return roundNumber(v, precision);
        } else if (_.isArray(v)) {
            if (_.isNumber(v[0])) {
                // it's got numbers in it directly
                return v.map((item) => roundNumber(item, precision));
            } else {
                // it's got numbers in it directly
                return v.map((item) => roundValues(item, precision));
            }
        } else if (_.isObject(v)) {
            // if the value is a nested object then recur
            return roundValues(v, precision);
        } else {
            return v
        }
    });
};

export let MathHelper = {
    round: roundNumber,
    roundValues: roundValues
};
