
const dni = [0, 0, 0, 0, 0, 0, 100, 300, 600, 800, 900, 1000, 950, 850, 650, 350, 150, 50, 0, 0, 0, 0, 0, 0];
const dhi = [0, 0, 0, 0, 0, 0, 10, 20, 30, 30, 40, 40, 50, 40, 40, 30, 20, 10, 0, 0, 0, 0, 0, 0];
const ghi = [0, 0, 0, 0, 0, 0, 50, 150, 400, 600, 700, 800, 800, 700, 600, 400, 150, 50, 0, 0, 0, 0, 0, 0];

let pvCases = [
    {
        latitude: 40,
        longitude: 120,
        settings: {
            nominalPower: 300,  // module watts output at 1,000 w/m2 irradiance
            numModules: 5,  // integer >= 1
            azimuth: 180,  // degrees clockwise from north (0 to 360)
            tilt: 40,  // degrees tilt from horizontal (0 to 90)
            systemLosses: 0.10   // 0.00 to 1.00 (e.g., 0.10 = 10% balance-of-system losses)
        },
        climate: [
            {
                latitude: 40,
                longitude: 120,
                dni: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.7, 4.27, 2.97, 4, 1.52, 0, 0, 0, 0, 0, 0, 0, 0], 
                dhi: [0, 0, 0, 0, 0, 0, 0, 0, 1.81, 52.66, 108.68, 151.72, 176.18, 175.22, 169.03, 138.88, 87.06, 29.41, 0.12, 0, 0, 0, 0, 0], 
                ghi: [0, 0, 0, 0, 0, 0, 0, 0, 1.81, 52.66, 108.68, 152.47, 178.35, 176.76, 170.97, 139.49, 87.06, 29.41, 0.12, 0, 0, 0, 0, 0]
            },
            { dni, dhi, ghi },
            { dni, dhi, ghi },
            { dni, dhi, ghi },
            { dni, dhi, ghi },
            { dni, dhi, ghi },
            { dni, dhi, ghi },
            { dni, dhi, ghi },
            { dni, dhi, ghi },
            { dni, dhi, ghi },
            { dni, dhi, ghi },
            { dni, dhi, ghi }
        ],
        expected: [ 62.95065133358349, 214.96231861975096, 243.9883741672213, 233.90333883008253, 232.34848448136623, 218.39670616052447, 228.49383832893298, 238.1055901605035, 236.78896704825775, 240.9898946923989, 219.59803268056734, 220.80420565918388 ]
    }
];

let foo = [
    // San Francisco, CA
    {
        latitude: 37.62,
        longitude: -122.38,
        settings: {
            tilt: 20,
            azimuth: 180,
            nominalPower: 4,
            numPanels: 1,
            ventilationType: "",
            lossPercent: 14,
            inverterEfficiencyPercent: 96,
            dcAcRatio: 1.1
        },
        climate: [
            {dhi:39.21,  ghi:88.4,  dni:126.53, albedo:0.2},
            {dhi:59.48,  ghi:131,   dni:150.6,  albedo:0.2},
            {dhi:79.62,  ghi:182.9, dni:184.89, albedo:0.2},
            {dhi:98.49,  ghi:236.1, dni:220.81, albedo:0.2},
            {dhi:96.86,  ghi:267.8, dni:256.91, albedo:0.2},
            {dhi:111.36, ghi:298.1, dni:279.21, albedo:0.2},
            {dhi:93.6,   ghi:297.4, dni:301.78, albedo:0.2},
            {dhi:90.58,  ghi:266.8, dni:270.72, albedo:0.2},
            {dhi:67.8,   ghi:227.2, dni:272.71, albedo:0.2},
            {dhi:57.4,   ghi:156.3, dni:192.36, albedo:0.2},
            {dhi:43.98,  ghi:104.9, dni:145.39, albedo:0.2},
            {dhi:35.92,  ghi:87.9,  dni:138.81, albedo:0.2}
        ],
        result: {
            ac: [
                309.59674072265625,
                369.602294921875,
                494.819580078125,
                592.80126953125,
                674.0944213867188,
                676.1754760742188,
                742.669921875,
                674.3948364257812,
                601.3898315429688,
                478.65948486328125,
                321.8603820800781,
                284.2268981933594
            ]
        }
    }
];

export default pvCases;