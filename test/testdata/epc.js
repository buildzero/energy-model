
// RESULTS
export let internalGains = [
    {occupancy_rate: 541, appliance_rate: 1230, lighting_rate: 1460, total_rate: 3232, occupancy: 1450, appliance: 3295, lighting: 3911, total: 8656},
    {occupancy_rate: 544, appliance_rate: 1236, lighting_rate: 1466, total_rate: 3246, occupancy: 1316, appliance: 2990, lighting: 3547, total: 7853},
    {occupancy_rate: 559, appliance_rate: 1271, lighting_rate: 1501, total_rate: 3331, occupancy: 1498, appliance: 3404, lighting: 4020, total: 8922},
    {occupancy_rate: 517, appliance_rate: 1176, lighting_rate: 1406, total_rate: 3100, occupancy: 1341, appliance: 3048, lighting: 3645, total: 8034},
    {occupancy_rate: 559, appliance_rate: 1271, lighting_rate: 1501, total_rate: 3331, occupancy: 1498, appliance: 3404, lighting: 4020, total: 8922},
    {occupancy_rate: 554, appliance_rate: 1260, lighting_rate: 1490, total_rate: 3305, occupancy: 1437, appliance: 3266, lighting: 3862, total: 8565},
    {occupancy_rate: 523, appliance_rate: 1190, lighting_rate: 1420, total_rate: 3133, occupancy: 1402, appliance: 3186, lighting: 3802, total: 8390},
    {occupancy_rate: 559, appliance_rate: 1271, lighting_rate: 1501, total_rate: 3331, occupancy: 1498, appliance: 3404, lighting: 4020, total: 8922},
    {occupancy_rate: 536, appliance_rate: 1218, lighting_rate: 1448, total_rate: 3202, occupancy: 1389, appliance: 3157, lighting: 3754, total: 8300},
    {occupancy_rate: 541, appliance_rate: 1230, lighting_rate: 1460, total_rate: 3232, occupancy: 1450, appliance: 3295, lighting: 3911, total: 8656},
    {occupancy_rate: 554, appliance_rate: 1260, lighting_rate: 1490, total_rate: 3305, occupancy: 1437, appliance: 3266, lighting: 3862, total: 8565},
    {occupancy_rate: 523, appliance_rate: 1190, lighting_rate: 1420, total_rate: 3133, occupancy: 1402, appliance: 3186, lighting: 3802, total: 8390}
];


// INPUTS
export let buildingSettings = {
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

// weekday and weekend usage factors for each hour of a representative day
export let dailyUsage = [
    {wd_heat_point: 16.0, wd_cool_point: 29.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 0.10, wd_appliance: 0.10, wd_lighting: 0.10, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 16.0, wd_cool_point: 29.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 0.10, wd_appliance: 0.10, wd_lighting: 0.10, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 16.0, wd_cool_point: 29.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 0.10, wd_appliance: 0.10, wd_lighting: 0.10, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 16.0, wd_cool_point: 29.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 0.10, wd_appliance: 0.10, wd_lighting: 0.10, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 16.0, wd_cool_point: 29.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 0.10, wd_appliance: 0.10, wd_lighting: 0.10, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 16.0, wd_cool_point: 29.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 0.10, wd_appliance: 0.10, wd_lighting: 0.10, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 16.0, wd_cool_point: 29.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 0.10, wd_appliance: 0.10, wd_lighting: 0.10, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 16.0, wd_cool_point: 29.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 0.10, wd_appliance: 0.10, wd_lighting: 0.10, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 21.0, wd_cool_point: 24.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 1.0, wd_appliance: 1.0, wd_lighting: 1.0, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 21.0, wd_cool_point: 24.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 1.0, wd_appliance: 1.0, wd_lighting: 1.0, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 21.0, wd_cool_point: 24.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 1.0, wd_appliance: 1.0, wd_lighting: 1.0, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 21.0, wd_cool_point: 24.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 1.0, wd_appliance: 1.0, wd_lighting: 1.0, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 21.0, wd_cool_point: 24.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 1.0, wd_appliance: 1.0, wd_lighting: 1.0, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 21.0, wd_cool_point: 24.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 1.0, wd_appliance: 1.0, wd_lighting: 1.0, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 21.0, wd_cool_point: 24.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 1.0, wd_appliance: 1.0, wd_lighting: 1.0, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 21.0, wd_cool_point: 24.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 1.0, wd_appliance: 1.0, wd_lighting: 1.0, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 21.0, wd_cool_point: 24.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 1.0, wd_appliance: 1.0, wd_lighting: 1.0, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 21.0, wd_cool_point: 24.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 1.0, wd_appliance: 1.0, wd_lighting: 1.0, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 16.0, wd_cool_point: 29.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 0.10, wd_appliance: 0.10, wd_lighting: 0.10, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 16.0, wd_cool_point: 29.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 0.10, wd_appliance: 0.10, wd_lighting: 0.10, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 16.0, wd_cool_point: 29.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 0.10, wd_appliance: 0.10, wd_lighting: 0.10, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 16.0, wd_cool_point: 29.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 0.10, wd_appliance: 0.10, wd_lighting: 0.10, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 16.0, wd_cool_point: 29.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 0.10, wd_appliance: 0.10, wd_lighting: 0.10, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10},
    {wd_heat_point: 16.0, wd_cool_point: 29.0, we_heat_point: 16.0, we_cool_point: 29.0, wd_occupancy: 0.10, wd_appliance: 0.10, wd_lighting: 0.10, we_occupancy: 0.10,  we_appliance: 0.10,  we_lighting: 0.10}
];


// definition of external facing building walls and windows
export let buildingElements = [
    {
        type: "wall",
        orientation: "S",
        area: 73.5,
        u_value: 0.35,
        absorptivity: 0.7,
        emissivity: 0.7
    },
    {
        type: "window",
        orientation: "S",
        area: 31.5,
        u_value: 3.09,
        emissivity: 0.84,
        solar_transmittance: 0.7,
        reduction_factor_Z_for_temporary: 1
    },
    {
        type: "wall",
        orientation: "E",
        area: 42.0,
        u_value: 0.35,
        absorptivity: 0.7,
        emissivity: 0.7
    },
    {
        type: "window",
        orientation: "E",
        area: 18.0,
        u_value: 3.09,
        emissivity: 0.84,
        solar_transmittance: 0.7,
        reduction_factor_Z_for_temporary: 1
    },
    {
        type: "wall",
        orientation: "N",
        area: 73.5,
        u_value: 0.35,
        absorptivity: 0.7,
        emissivity: 0.7
    },
    {
        type: "window",
        orientation: "N",
        area: 31.5,
        u_value: 3.09,
        emissivity: 0.84,
        solar_transmittance: 0.7,
        reduction_factor_Z_for_temporary: 1
    },
    {
        type: "wall",
        orientation: "W",
        area: 42.0,
        u_value: 0.35,
        absorptivity: 0.7,
        emissivity: 0.7
    },
    {
        type: "window",
        orientation: "W",
        area: 18.0,
        u_value: 3.09,
        emissivity: 0.84,
        solar_transmittance: 0.7,
        reduction_factor_Z_for_temporary: 1
    },
    {
        type: "roof",
        area: 112.0,
        u_value: 0.25,
        absorptivity: 0.85,
        emissivity: 0.85
    }
];


// region is Atlanta
// should be an array with each element corresponding to a month of year (0=jan, 11=dec)
// each entry is an object with the relevant data for the given month
export let climate = [
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
    },
    {
        mon: "feb",
        temp: 8,
        wind_speed: 5.2,
        avg_solar_S: 162,
        avg_solar_SE: 127,
        avg_solar_E: 78,
        avg_solar_NE: 39,
        avg_solar_N: 33,
        avg_solar_NW: 46,
        avg_solar_W: 94,
        avg_solar_SW: 143,
        avg_solar_HOR: 139,
        solar_altitude: 26.3,
        dry_air_humidity: 4.28,
        atmospheric_pressure: 98371,
        relative_humidity: 58,
        dew_point: -1.325595238,
        sky_cover: 0.580505952,
        sky_temp: 264.706049,
        solar_transmittance: 0.92
    },
    {
        mon: "mar",
        temp: 14,
        wind_speed: 4.9,
        avg_solar_S: 162,
        avg_solar_SE: 137,
        avg_solar_E: 103,
        avg_solar_NE: 63,
        avg_solar_N: 49,
        avg_solar_NW: 79,
        avg_solar_W: 136,
        avg_solar_SW: 167,
        avg_solar_HOR: 194,
        solar_altitude: 32.9,
        dry_air_humidity: 5.72,
        atmospheric_pressure: 98195,
        relative_humidity: 55,
        dew_point: 3.800672043,
        sky_cover: 0.571639785,
        sky_temp: 271.9444134,
        solar_transmittance: 0.88
    },
    {
        mon: "apr",
        temp: 17,
        wind_speed: 4.0,
        avg_solar_S: 138,
        avg_solar_SE: 141,
        avg_solar_E: 127,
        avg_solar_NE: 89,
        avg_solar_N: 64,
        avg_solar_NW: 109,
        avg_solar_W: 156,
        avg_solar_SW: 160,
        avg_solar_HOR: 239,
        solar_altitude: 37.9,
        dry_air_humidity: 7.74,
        atmospheric_pressure: 98254,
        relative_humidity: 62,
        dew_point: 8.81,
        sky_cover: 0.448472222,
        sky_temp: 276.7888189,
        solar_transmittance: 0.82
    },
    {
        mon: "may",
        temp: 21,
        wind_speed: 3.5,
        avg_solar_S: 117,
        avg_solar_SE: 139,
        avg_solar_E: 144,
        avg_solar_NE: 114,
        avg_solar_N: 85,
        avg_solar_NW: 130,
        avg_solar_W: 162,
        avg_solar_SW: 148,
        avg_solar_HOR: 263,
        solar_altitude: 40.4,
        dry_air_humidity: 10.48,
        atmospheric_pressure: 98033,
        relative_humidity: 67,
        dew_point: 13.69435484,
        sky_cover: 0.593682796,
        sky_temp: 281.8729926,
        solar_transmittance: 0.75
    },
    {
        mon: "jun",
        temp: 25,
        wind_speed: 3.9,
        avg_solar_S: 107,
        avg_solar_SE: 135,
        avg_solar_E: 150,
        avg_solar_NE: 125,
        avg_solar_N: 98,
        avg_solar_NW: 144,
        avg_solar_W: 170,
        avg_solar_SW: 144,
        avg_solar_HOR: 280,
        solar_altitude: 42.8,
        dry_air_humidity: 12.61,
        atmospheric_pressure: 97934,
        relative_humidity: 63,
        dew_point: 16.44902778,
        sky_cover: 0.483333333,
        sky_temp: 286.199821,
        solar_transmittance: 0.69
    },
    {
        mon: "jul",
        temp: 26,
        wind_speed: 3.2,
        avg_solar_S: 108,
        avg_solar_SE: 134,
        avg_solar_E: 145,
        avg_solar_NE: 119,
        avg_solar_N: 91,
        avg_solar_NW: 134,
        avg_solar_W: 161,
        avg_solar_SW: 142,
        avg_solar_HOR: 263,
        solar_altitude: 41.7,
        dry_air_humidity: 15.08,
        atmospheric_pressure: 98213,
        relative_humidity: 71,
        dew_point: 19.84758065,
        sky_cover: 0.540188172,
        sky_temp: 288.5518314,
        solar_transmittance: 0.72
    },
    {
        mon: "aug",
        temp: 27,
        wind_speed: 3.4,
        avg_solar_S: 129,
        avg_solar_SE: 139,
        avg_solar_E: 134,
        avg_solar_NE: 101,
        avg_solar_N: 76,
        avg_solar_NW: 118,
        avg_solar_W: 157,
        avg_solar_SW: 154,
        avg_solar_HOR: 242,
        solar_altitude: 39.1,
        dry_air_humidity: 16.01,
        atmospheric_pressure: 98008,
        relative_humidity: 73,
        dew_point: 20.72446237,
        sky_cover: 0.549731183,
        sky_temp: 289.3616457,
        solar_transmittance: 0.79
    },
    {
        mon: "sep",
        temp: 23,
        wind_speed: 3.1,
        avg_solar_S: 135,
        avg_solar_SE: 127,
        avg_solar_E: 105,
        avg_solar_NE: 69,
        avg_solar_N: 51,
        avg_solar_NW: 81,
        avg_solar_W: 124,
        avg_solar_SW: 141,
        avg_solar_HOR: 182,
        solar_altitude: 35.2,
        dry_air_humidity: 12.70,
        atmospheric_pressure: 97812,
        relative_humidity: 72,
        dew_point: 16.82388889,
        sky_cover: 0.466944444,
        sky_temp: 284.1824533,
        solar_transmittance: 0.86
    },
    {
        mon: "oct",
        temp: 16,
        wind_speed: 4.0,
        avg_solar_S: 164,
        avg_solar_SE: 127,
        avg_solar_E: 83,
        avg_solar_NE: 43,
        avg_solar_N: 35,
        avg_solar_NW: 54,
        avg_solar_W: 109,
        avg_solar_SW: 153,
        avg_solar_HOR: 160,
        solar_altitude: 28.2,
        dry_air_humidity: 8.80,
        atmospheric_pressure: 98087,
        relative_humidity: 74,
        dew_point: 10.77755376,
        sky_cover: 0.484677419,
        sky_temp: 276.1970761,
        solar_transmittance: 0.91
    },
    {
        mon: "nov",
        temp: 12,
        wind_speed: 4.2,
        avg_solar_S: 166,
        avg_solar_SE: 121,
        avg_solar_E: 69,
        avg_solar_NE: 35,
        avg_solar_N: 32,
        avg_solar_NW: 40,
        avg_solar_W: 89,
        avg_solar_SW: 144,
        avg_solar_HOR: 123,
        solar_altitude: 24.1,
        dry_air_humidity: 5.86,
        atmospheric_pressure: 98102,
        relative_humidity: 63,
        dew_point: 4.173472222,
        sky_cover: 0.519166667,
        sky_temp: 270.3190692,
        solar_transmittance: 0.93
    },
    {
        mon: "dec",
        temp: 8,
        wind_speed: 4.7,
        avg_solar_S: 161,
        avg_solar_SE: 116,
        avg_solar_E: 60,
        avg_solar_NE: 29,
        avg_solar_N: 28,
        avg_solar_NW: 33,
        avg_solar_W: 76,
        avg_solar_SW: 135,
        avg_solar_HOR: 105,
        solar_altitude: 20.8,
        dry_air_humidity: 4.53,
        atmospheric_pressure: 98424,
        relative_humidity: 64,
        dew_point: 0.261342282,
        sky_cover: 0.555704698,
        sky_temp: 265.0909842,
        solar_transmittance: 0.94
    }
];
