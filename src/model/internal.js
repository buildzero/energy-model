
// Clause 10.x - Internal Heat Gains (pages 47-53)


// 10.4.2/10.4.3 - Heat gains from internal occupants, appliances, and lighting (page 50)
// unit = watts
//
// Input:
//  * an object containing the general usage factors for the building at the given time
//  * an object containing global building settings
//
// Output:
//  * object
export function heatFlowRates(conditions, settings) {
    // all of these heat flow rates are effectively calculated as (use_factor * load)
    // we intend to calculate rates for: human occupancy, appliances, and lighting

    // if no daylighting factor is defined then default to 1.0
    let daylighting_factor = settings.daylighting_factor ? settings.daylighting_factor : 1.0;

    // our lighting load depends on several different factors from the input so
    // put that all together here so it's easier to read.
    let lighting_load = settings.lighting_load * daylighting_factor * settings.lighting_occupancy_factor * settings.constant_illumination_factor;

    // the parasitic lighting load is given to us annually as kWh/m2/yr
    // so we need to convert that into W/m2 to match everything else
    let parasitic_lighting_load = (settings.annual_parasitic_load*1000/8760);

    // calculate all the individual rates for both weekdays and weekends
    let output = {
        // Weekday (Mon-Fri)
        occupancy_rate_wd: conditions.wd_occupancy * (settings.metabolic_load / settings.occupant_density),
        appliance_rate_wd: conditions.wd_appliance * settings.appliance_load,
        lighting_rate_wd: conditions.wd_lighting * lighting_load + parasitic_lighting_load,

        // Weekend (Sat-Sun)
        occupancy_rate_we: conditions.we_occupancy * (settings.metabolic_load / settings.occupant_density),
        appliance_rate_we: conditions.we_appliance * settings.appliance_load,
        lighting_rate_we: conditions.we_lighting * lighting_load + parasitic_lighting_load
    };

    // add on our total heat flow rates which is our ultimate aim
    // total rate = occupancy rate + appliances rate + lighting rate
    output.total_rate_wd = output.occupancy_rate_wd + output.appliance_rate_wd + output.lighting_rate_wd;
    output.total_rate_we = output.occupancy_rate_we + output.appliance_rate_we + output.lighting_rate_we;

    // and lastly lets calculate the total internal gains by multiply the heat flow rate against the floor area
    output.gains_wd = output.total_rate_wd * settings.floor_area;
    output.gains_we = output.total_rate_we * settings.floor_area;

    return output;
}
