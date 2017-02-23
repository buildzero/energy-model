import _ from "underscore";


function roundNumber(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
};


export let MathHelper = {
    round: roundNumber,

    roundValues: function(obj, precision) {
        return _.mapObject(obj, function (v, k) {
            return roundNumber(v, precision);
        });
    }
};
