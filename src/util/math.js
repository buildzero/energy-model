import _ from "underscore";
import suncalc from "suncalc";


function roundNumber(number, precision) {
    let factor = Math.pow(10, precision);
    let tempNumber = number * factor;
    let roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
}

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
}



export let MathHelper = {
    round: roundNumber,
    roundValues: roundValues,
    arrayAdd: function(a1, a2) {
        return a1.map((val, idx) => val + a2[idx]);
    },
    arrayMult: function(a1, a2) {
        return a1.map((val, idx) => val * a2[idx]);
    }
};


/////   Trig Calculations   /////

     
const degrees_to_radians =    3.1416 /  180.0000;
const radians_to_degrees =  180.0000 /    3.1416;
 
export function      Tangent (angle) { return Math.tan (angle * degrees_to_radians); }
export function         Sine (angle) { return Math.sin (angle * degrees_to_radians); }
export function       Cosine (angle) { return Math.cos (angle * degrees_to_radians); }
export function  ArcTangent (number) { return (Math.atan (number) * radians_to_degrees); }
export function     ArcSine (number) { return (Math.asin (number) * radians_to_degrees); }
export function   ArcCosine (number) { return (Math.acos (number) * radians_to_degrees); }
export function      Square (number) { return (number * number); }

export function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export function toDegrees(radians) {
    return radians * (180 / Math.PI);
}

export function cosd(angleInDegrees) {
    return Math.cos(toRadians(angleInDegrees));
}

export function sind(angleInDegrees) {
    return Math.sin(toRadians(angleInDegrees));
}

export function cosr(angleInRadians) {
    return Math.cos(angleInRadians);
}

export function sinr(angleInRadians) {
    return Math.sin(angleInRadians);
}


//////   Solar Calculations   //////

export function aoiProjection(tilt, azimuth, solarZenith, solarAzimuth) {
    return sind(solarZenith) * sind(tilt) * cosd(solarAzimuth - azimuth) + cosd(solarZenith) * cosd(tilt);
}

// Angle of Incidence
// all values should be supplied in degrees
export function aoi(tilt, azimuth, solarZenith, solarAzimuth) {
    // https://pvpmc.sandia.gov/modeling-steps/1-weather-design-inputs/plane-of-array-poa-irradiance/calculating-poa-irradiance/angle-of-incidence/
    // α = cos−1 [sin(θsun) sin(β) cos(γsun − γ) + cos(θsun) cos(β)]
    let projection = aoiProjection(tilt, azimuth, solarZenith, solarAzimuth);
    return toDegrees(Math.acos(projection));
}

// AOI projection ratio
export function aoiRatio(tilt, azimuth, solarZenith, solarAzimuth) {
    // ratio of titled and horizontal beam irradiance
    return aoiProjection(tilt, azimuth, solarZenith, solarAzimuth) / cosd(solarZenith);
}

export function dayAngle(dayOfYear) {
    return (2.0 * Math.PI / 365.0) * (dayOfYear - 1);
}

// calculate the representative position of the sun for a given hour of the day in a specified location
// this should use the midpoint of the hour when the sun is up, except during sunrise and sunset hours
// in which case it should use the midpoint between the start/end of the hour and sunrise/sunset times.
export function hourlySolarPositions(year, month, day, latitude, longitude) {
    // basic solar times for the given day
    let solarTimes = suncalc.getTimes(new Date(year, month - 1, day, 12, 0, 0), latitude, longitude);

    let positions = new Array(24);
    for (let i=0; i < 24; i++) {
        let hourStart = new Date(year, month-1, day, i, 0, 0, 0);
        let hourEnd = new Date(year, month-1, day, i, 59, 59, 999);
        let hourSolarMidpoint = new Date(year, month-1, day, i, 30, 0, 0);
        let isDaylight = false;

        if (solarTimes.sunrise < hourEnd && solarTimes.sunset > hourStart) {
            // sun is up for some portion of this hour
            isDaylight = true;

            let sunlightTimeMs = 0;
            if (solarTimes.sunrise > hourStart) {
                // sunrise hour
                sunlightTimeMs = hourEnd - solarTimes.sunrise;
                hourSolarMidpoint = new Date(year, month-1, day, i, solarTimes.sunrise.getMinutes() + (sunlightTimeMs/60000)/2, 0, 0);

            } else if (solarTimes.sunset < hourEnd) {
                // sunset hour
                sunlightTimeMs = solarTimes.sunset - hourStart;
                hourSolarMidpoint = new Date(year, month-1, day, i, (sunlightTimeMs/60000)/2, 0, 0);
            }

        }

        positions[i] = suncalc.getPosition(hourSolarMidpoint, latitude, longitude);
        positions[i].isDaylight = isDaylight;
    }

    return positions;
}
