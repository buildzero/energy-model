import {heatFlowRates} from 'thermal/internal';
import {MathHelper} from 'util/math';

function roundOutputs(output) {
    return {
        occupancy_rate_wd: MathHelper.round(output.occupancy_rate_wd, 2),
        appliance_rate_wd: MathHelper.round(output.appliance_rate_wd, 2),
        lighting_rate_wd: MathHelper.round(output.lighting_rate_wd, 2),
        total_rate_wd: MathHelper.round(output.total_rate_wd, 2),
        gains_wd: MathHelper.round(output.gains_wd, 0),

        occupancy_rate_we: MathHelper.round(output.occupancy_rate_we, 2),
        appliance_rate_we: MathHelper.round(output.appliance_rate_we, 2),
        lighting_rate_we: MathHelper.round(output.lighting_rate_we, 2),
        total_rate_we: MathHelper.round(output.total_rate_we, 2),
        gains_we: MathHelper.round(output.gains_we, 0)
    }
}


describe("Internal Gains", function() {
    let conditions = {
        // NOTE: it is important to be able to tell if a given hour of the day
        //       is considered a night-time or day-time hour.
        //       default seems to be day-time = 9am-6pm
        // weekday usage
        wd_heat_point: 16,
        wd_cool_point: 29,
        wd_occupancy: 0.10,
        wd_appliance: 0.10,
        wd_lighting: 0.10,
        // weekend usage
        we_heat_point: 16,
        we_cool_point: 29,
        we_occupancy: 1.0,
        we_appliance: 1.0,
        we_lighting: 1.0
    };

    let settings = {
        floor_area: 336,              // m2
        occupants: 17,                // people
        occupant_density: 20.0,       // m2/person (this can be area/occupants)
        metabolic_load: 88,           // W/person
        appliance_load: 10.0,         // W/m2
        lighting_load: 10.0,          // W/m2
        daylighting_factor: 1,
        lighting_occupancy_factor: 1,
        constant_illumination_factor: 1,
        incl_parasitic_lighting: true,
        annual_parasitic_load: 6
    };

    // Heat flow rates (occupancy, appliances, lighting)
    it("can calculate heat flow rates for occupancy, appliances, and lighting", function() {
        expect(roundOutputs(heatFlowRates(conditions, settings))).toEqual({
            occupancy_rate_wd: 0.44,
            appliance_rate_wd: 1.0,
            lighting_rate_wd: 1.68,
            total_rate_wd: 3.12,
            gains_wd: 1050,

            occupancy_rate_we: 4.40,
            appliance_rate_we: 10.0,
            lighting_rate_we: 10.68,
            total_rate_we: 25.08,
            gains_we: 8429
        });
    });

    it("ignores parasitic lighting when that is disabled", function() {
        settings.incl_parasitic_lighting = false;
        expect(roundOutputs(heatFlowRates(conditions, settings))).toEqual({
            occupancy_rate_wd: 0.44,
            appliance_rate_wd: 1,
            lighting_rate_wd: 1,
            total_rate_wd: 2.44,
            gains_wd: 820,
            occupancy_rate_we: 4.4,
            appliance_rate_we: 10,
            lighting_rate_we: 10,
            total_rate_we: 24.4,
            gains_we: 8198
        });
    });
});
