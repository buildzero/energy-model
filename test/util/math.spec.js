import {MathHelper} from "util/math";
import * as math from "util/math";


describe("MathHelper", function() {
    it("can round a single number", function() {
        expect(MathHelper.round(12.1248234, 0)).toEqual(12);
        expect(MathHelper.round(12.1248234, 1)).toEqual(12.1);
        expect(MathHelper.round(12.1248234, 2)).toEqual(12.12);
        expect(MathHelper.round(12.1248234, 3)).toEqual(12.125);
    });

    it("can round all values of a map", function() {
        expect(MathHelper.roundValues({a: 12.1248234, b: 44.2932}, 0)).toEqual({a: 12, b: 44});
        expect(MathHelper.roundValues({a: 12.1248234, b: 44.2932}, 1)).toEqual({a: 12.1, b: 44.3});
        expect(MathHelper.roundValues({a: 12.1248234, b: 44.2932}, 2)).toEqual({a: 12.12, b: 44.29});
        expect(MathHelper.roundValues({a: 12.1248234, b: 44.2932}, 3)).toEqual({a: 12.125, b: 44.293});
    });

    it("can do various array math operations", function() {
        expect(MathHelper.arrayAdd([1, 2, 3], [1, 2, 3])).toEqual([2, 4, 6]);
        expect(MathHelper.arrayMult([1, 2, 3], [1, 2, 3])).toEqual([1, 4, 9]);
    });
});


// describe("Solar Calcs", function() {
    
//     // each case here should include inputs and expected output values
//     let testCases = [
//         {
//             doy: 250,
//             dayAngle: 4.2863373739389505,

//             latitude: 37.796771,
//             longitude: -122.395252,
//             tilt: 20,
//             azimuth: 210,
//             solarZenith: 35.00,
//             solarAzimuth: 206.68,

//             aoi: 15.072,
//             aoiProjection: 0.9655965788744573,
//             aoiRatio: 1.178775766484934
//         }
//     ];

//     it("can calculate solar angle", function() {
//         testCases.map((tc) => {
//             expect(math.dayAngle(tc.doy)).toBeCloseTo(tc.dayAngle);
//         });
//     });

//     it("can calculate AOI (angle of incidence)", function() {
//         testCases.map((tc) => {
//             expect(math.aoi(tc.tilt, tc.azimuth, tc.solarZenith, tc.solarAzimuth)).toBeCloseTo(tc.aoi);
//         });
//     });

//     it("can calculate AOI (angle of incidence) projection", function () {
//         testCases.map((tc) => {
//             expect(math.aoiProjection(tc.tilt, tc.azimuth, tc.solarZenith, tc.solarAzimuth)).toBeCloseTo(tc.aoiProjection);
//         });
//     });

//     it("can calculate AOI (angle of incidence) ratio", function () {
//         testCases.map((tc) => {
//             expect(math.aoiRatio(tc.tilt, tc.azimuth, tc.solarZenith, tc.solarAzimuth)).toBeCloseTo(tc.aoiRatio);
//         });
//     });

//     it("can calculate hourly solar positions for a day", function () {
//         let results = math.hourlySolarPositions(2017, 11, 7, 37.62, -122.38);
//         let expected = [
//             { azimuth: -2.74126994367235, altitude: -1.1732406532058315, isDaylight: false },
//             { azimuth: -2.245473435885249, altitude: -1.0463048713142042, isDaylight: false },
//             { azimuth: -1.9380882715520011, altitude: -0.8661581782999805, isDaylight: false },
//             { azimuth: -1.7258259764201223, altitude: -0.6660622693311219, isDaylight: false },
//             { azimuth: -1.5560500139358524, altitude: -0.45955257759610535, isDaylight: false },
//             { azimuth: -1.4025585761180182, altitude: -0.2533986843585177, isDaylight: false },
//             { azimuth: -1.1968989856038372, altitude: 0.012423204323392965, isDaylight: true },
//             { azimuth: -1.0857454613676012, altitude: 0.1379880943947437, isDaylight: true },
//             { azimuth: -0.8992420380688404, altitude: 0.31148648195896966, isDaylight: true },
//             { azimuth: -0.6793771519776146, altitude: 0.45867725468996134, isDaylight: true },
//             { azimuth: -0.41900981757300604, altitude: 0.56702543382222, isDaylight: true },
//             { azimuth: -0.12296917989728005, altitude: 0.6225759073833014, isDaylight: true },
//             { azimuth: 0.18561937354079894, altitude: 0.6158326788323745, isDaylight: true },
//             { azimuth: 0.47538741722194305, altitude: 0.5480499254058876, isDaylight: true },
//             { azimuth: 0.7269399925305122, altitude: 0.4302975823942115, isDaylight: true },
//             { azimuth: 0.9387782232810216, altitude: 0.2765796408452645, isDaylight: true },
//             { azimuth: 1.1193563399539517, altitude: 0.09877468545070446, isDaylight: true },
//             { azimuth: 1.20934713106107, altitude: -0.006040195347326261, isDaylight: true },
//             { azimuth: 1.4311218291857637, altitude: -0.296985013926412, isDaylight: false },
//             { azimuth: 1.5858264638282913, altitude: -0.5038415008804763, isDaylight: false },
//             { azimuth: 1.7607579895020922, altitude: -0.7100233315592211, isDaylight: false },
//             { azimuth: 1.9858294091127286, altitude: -0.9080494770809715, isDaylight: false },
//             { azimuth: 2.322559116895185, altitude: -1.081936967485384, isDaylight: false },
//             { azimuth: 2.8685911592898905, altitude: -1.192009094302554, isDaylight: false }
//         ];

//         for (let i=0; i < 24; i++) {
//             expect(results[i]).toEqual(expected[i]);
//         }
//     });
// });
