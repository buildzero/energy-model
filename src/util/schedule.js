
// takes in the original input on building usage per hour and does summary work
// to calculate things like how much of the usage is daytime vs nighttime, what
// fraction of a typical week is active vs inactive, etc.
export function summarizeUsageConditions(hourlyConditions) {

    // start by summing the basic usage into 3 buckets for: total, daytime, nighttime
    let totals = hourlyConditions.reduce(function (acc, val, idx) {
        // always increment total
        acc.occupancy_total_wd += val.wd_occupancy;
        acc.occupancy_total_we += val.we_occupancy;
        acc.appliance_total_wd += val.wd_appliance;
        acc.appliance_total_we += val.we_appliance;
        acc.lighting_total_wd += val.wd_lighting;
        acc.lighting_total_we += val.we_lighting;

        // conditionally increment day/night totals depending on hour of day
        // NOTE: remember here that the indexes are zero-based, so we would
        //       need to add 1 to them to represent the actual hour of the day
        if (idx < 8 || idx > 17) {
            // night time hour
            acc.occupancy_night_wd += val.wd_occupancy;
            acc.occupancy_night_we += val.we_occupancy;
            acc.appliance_night_wd += val.wd_appliance;
            acc.appliance_night_we += val.we_appliance;
            acc.lighting_night_wd += val.wd_lighting;
            acc.lighting_night_we += val.we_lighting;
        } else {
            // day time hour
            acc.occupancy_day_wd += val.wd_occupancy;
            acc.occupancy_day_we += val.we_occupancy;
            acc.appliance_day_wd += val.wd_appliance;
            acc.appliance_day_we += val.we_appliance;
            acc.lighting_day_wd += val.wd_lighting;
            acc.lighting_day_we += val.we_lighting;
        }

        return acc;
    }, {
        occupancy_total_wd: 0,
        occupancy_day_wd: 0,
        occupancy_night_wd: 0,
        occupancy_total_we: 0,
        occupancy_day_we: 0,
        occupancy_night_we: 0,
        appliance_total_wd: 0,
        appliance_day_wd: 0,
        appliance_night_wd: 0,
        appliance_total_we: 0,
        appliance_day_we: 0,
        appliance_night_we: 0,
        lighting_total_wd: 0,
        lighting_day_wd: 0,
        lighting_night_wd: 0,
        lighting_total_we: 0,
        lighting_day_we: 0,
        lighting_night_we: 0
    });

    // percentage of hours in a week which are under load.
    totals.occupancy_weekly_fraction = ((totals.occupancy_total_wd * 5) + (totals.occupancy_total_we * 2)) / 168;
    totals.appliance_weekly_fraction = ((totals.appliance_total_wd * 5) + (totals.appliance_total_we * 2)) / 168;
    totals.lighting_weekly_fraction = ((totals.lighting_total_wd * 5) + (totals.lighting_total_we * 2)) / 168;

    return totals;
}
