import {summarizeUsageConditions} from "util/schedule";
import {MathHelper} from "util/math";

import {hourlyConditions} from "testdata/epc";


describe("summarizeUsageConditions", function() {
    it("can summarize the data from hourly conditions", function() {
        expect(MathHelper.roundValues(summarizeUsageConditions(hourlyConditions), 2)).toEqual({
            occupancy_total_wd: 11.4,
            occupancy_day_wd: 10.0,
            occupancy_night_wd: 1.4,
            occupancy_total_we: 2.4,
            occupancy_day_we: 1.0,
            occupancy_night_we: 1.4,
            appliance_total_wd: 11.4,
            appliance_day_wd: 10.0,
            appliance_night_wd: 1.4,
            appliance_total_we: 2.4,
            appliance_day_we: 1.0,
            appliance_night_we: 1.4,
            lighting_total_wd: 11.4,
            lighting_day_wd: 10.0,
            lighting_night_wd: 1.4,
            lighting_total_we: 2.4,
            lighting_day_we: 1.0,
            lighting_night_we: 1.4,
            occupancy_weekly_fraction: 0.37,
            appliance_weekly_fraction: 0.37,
            lighting_weekly_fraction: 0.37
        });
    });
});
