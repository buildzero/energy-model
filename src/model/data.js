/*
  often we need to pass in large groups of definitions for a given calculation,
  such as in the solar gains and heat transfer by transmissions calcs which need
  the entire building envelope definition including assemblies, etc.

  it may be ideal to maintain a separate set of data structures for the persisted
  info about model, normalized for easy collection and management by category, but
  to then create a working data structure for the model usage itself which is a
  denormalized structure where things like assembly data is merged with areas to
  make it easier to access the relevant attributes.
*/

let BUILDING = {
    assemblies: ASSEMBLIES,
    areas: AREAS,
    windows: WINDOWS,
    ground: GROUND
}

let ASSEMBLIES = {
    asm01: ASSEMBLY
};

let ASSEMBLY = {
    id: "asm01",                            // unique identifier, UUID?
    name: "Wall",                           // user defined name
    type: "wall",                           // {"roof", "wall", "floor"}
    adjacent_to: "outdoorair",              // {"outdoorair", "ground", "ventilated"}
    layers: [{                              // and ORDERED list of layers making up the assembly
        name: "gypsum",
        thickness: 0.63,
        r_per_inch: 0.9
    },{
        name: "cellulose",                  // user defined name
        thickness: 3.5,                     // thickness of material
        r_per_inch: 3.6                     // r-value per inch of material
    },{
        name: "sheathing",
        thickness: 0.63,
        r_per_inch: 1.4
    }],
    u_value_supplement: 0,                  // a user defined supplement to the u-value
    absorptivity: 0.6,                      // coefficient of heat absorption (TODO: ok?)
    emissivity: 0.1,                        // coefficient of heat emission (TODO: ok?)

    // this stuff is all calculated
    thickness: 13.25,                       // total thickness
    r_value: 41.6,                           // total r-value (TODO: how to calc?)
    u_value: 0,                             // total u-value (TODO: how to calc?)
    g_value: 0.023                          // absorptivity * r-value * u-value
};


let WINDOWS = {
    win01: WINDOW
};

let WINDOW = {
    id: "win01",                            // unique identifier, UUID?
    name: "Double Pane",                    // user defined name

    // this stuff is all calculated
    thickness: 13.25,                       // total thickness
    r_value: 41.6,                          // total r-value (TODO: how to calc?)
    u_value: 0,                             // total u-value (TODO: how to calc?)
    g_value: 0.023                          // absorptivity * r-value * u-value
};


let AREA = {
    name: "Front Wall",
    group: "front",
    assembly: "asm01",
    area: 100,              // capture unit?
    orientation: 74,
    inclination: 30,
    windows: [{
        name: "Large Bay Window",
        area: 40, // capture unit?
        component_id: "win01",
        frame_id: "frame01",
        // installation situation??
        shading: {
            height: 0,
            horizontal_distance: 0,
            reveal_depth: 0,
            distance_to_reveal: 0,
            overhang_depth: 0,
            distance_to_overhang: 0,
            additional_reduction_winter: 0,
            additional_reduction_summer: 0,
            reduction_factor_Z_for_temporary: 0
        }
    }]
}


// ELEMENT:
//  name
//  group (for logically organizing surfaces together)
//  area (length * width + user determined addition - user determined subtraction)
//  assembly id (defines physical qualities of element like R value)
//  angle deviation from North (0=North, 90=East, 180=South, 270=West)
//  angle of inclination from horizontal (0/180=flat, 90=vertical)
//  ?? reduction factor shading
//  ?? exterior absorptivity
//  ?? exterior emissivity
//
// GLAZING ELEMENTS:
//  name
//  area (lenth * width + user determined)
//  element id (where this is installed)
//  glazing component id (window properties)
//  frame component id (window frame properties)
//  ?? installation situation (not sure exactly what this is for)
//
// GLAZING ELEMENT SHADING:
//  height of shading object
//  horizontal distance
//  window reveal depth (lateral reveal)
//  distance from glazing edge to reveal (lateral reveal)
//  overhang depth (reveal/overhang)
//  distance from upper glazing edge to overhang (reveal/overhang)
//  additional reduction factor winter shading
//  additional reduction factor summer shading
//  reduction factor z for temporary sun protection (manual shade ??)

let GENERAL_SETTINGS = {
    floor_area: 336,              // m2
    occupants: 17,                // people
    occupant_density: 20.0,       // m2/person (this can be area/occupants)
    metabolic_load: 88,           // W/person
    appliance_load: 10.0,         // W/m2
    lighting_load: 10.0,          // W/m2
    outdoor_air_flow_rate: 10.0,            // liter/s/person
    dhw: 5.0,                               // liter/m2/person
    heat_capacity_type: "heavy",            // vlight, light, medium, heavy, vheavy
    total_ventilated_volume: 840,           // m3
    building_height: 7.5,                   // m
    terrain_class: "urban",                 // open, country, urban

    // lighting specific
    daylighting_factor: 1,
    lighting_occupancy_factor: 1,
    constant_illumination_factor: 1,
    incl_parasitic_lighting: true,          // true/false
    annual_parasitic_load: 6,               // kWh/m2/yr

    // HVAC
    hvac_system_type: 0,
    ventilation_type: 0,           // mechanical, mechanical + natural, or natural
    mech_vent_supply_rate: 0,
    mech_vent_exhaust_rate: 0,
    heat_recovery_type: 0,                  // none, heat exch plates/pipes, two elements, load cooling, heat pipes, slow rotating
    exhaust_air_recirculation_percent: 0,   // none, 20%, 40%, 60%
    air_leakage_level: 1.1,                 // m3/hr
    specific_fan_power: 1.8,                // W/(l/s)
    fan_flow_control: 1.0,
    pump_control_heating: 0,
    pump_control_cooling: 0,

    // Natural Ventilation
    window_area_opened: 100,                // m2
    open_temp_heating: 21,                  // C (temp at which windows are opened, heating season)
    open_temp_cooling: 24                   // C (temp at which windows are opened, cooling season)

};


// should be an array with each element corresponding to an hour of the day (0-23)
// each entry is an object with the relevant data about usage for that hour
let SCHEDULE = [
    {
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
        we_occupancy: 0.10,
        we_appliance: 0.10,
        we_lighting: 0.10
    }
];

// should be an array with each element corresponding to a month of year (0=jan, 11=dec)
// each entry is an object with the relevant data for the given month
let CLIMATE = [
    {
        mon: "jan",
        temp: 4,
        wind_speed: 4.6,
        avg_solar_S: 166,
        avg_solar_SE: 119,
        avg_solar_E: 64,
        avg_solar_NE: 33,
        avg_solar_N: 30,
        avg_solar_NW: 38,
        avg_solar_W: 85,
        avg_solar_SW: 144,
        avg_solar_HOR: 116,
        solar_altitude: 22.4,
        dry_air_humidity: 3.60,
        atmospheric_pressure: 98645,
        relative_humidity: 65,
        dew_point: -3.033512786,
        sky_cover: 0.616689098,
        sky_temp: 260.3223678,
        solar_transmittance: 0.92
    }
];

// month
// heating vs cooling
// category OR element
let RESULT = {
    heating: {
        0: {
            internal: {
                lighting: 0,
                appliance: 0,
                occupancy: 0,
                total: 0
            },
            solar: {

            },
            transmission: {

            },
            ventilation: {
                mechanical: 0,
                natural: 0,
                infiltration: 0,
                total: 0
            }
        },
        total: {

        }
    },
    cooling: {

    }
};
