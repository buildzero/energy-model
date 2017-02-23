import {MathHelper} from "util/math";


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
});
