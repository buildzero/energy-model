import {MathHelper} from "util/math";


//=======   RESULTS   =========

// TRANSMISSION HEAT TRANSFER
export let heatTransferCoeffiecient = 415.5130;

// TODO: some of the decimal place values are off from what's in EPC !?
export let transmissionHeatTransfer = [
    { heating: 16710.0613, cooling: 22384.6782 },
    { heating: 11841.0228, cooling: 16299.9291 },
    { heating: 7528.4668, cooling: 11823.0753 },
    { heating: 3784.9955, cooling: 8315.2214 },
    { heating: 125.6832, cooling: 4619.8364 },
    { heating: -4087.8506, cooling: 486.1019 },
    { heating: -5632.4621, cooling: -480.8016 },
    { heating: -6176.7997, cooling: -1273.5408 },
    { heating: -1646.9277, cooling: 2776.028 },
    { heating: 5144.2229, cooling: 9573.8274 },
    { heating: 8984.5947, cooling: 13272.4934 },
    { heating: 13187.4284, cooling: 18307.1483 }
];


// VENTILATION HEAT TRANSFER
export let heatTransferVentilationDetailed = [
    {
        weekday: [67.896289, 68.557215, 69.224369, 67.835575, 66.845864, 65.510978, 70.192180, 68.527511, 251.716626, 260.026165, 264.571703, 261.019686, 262.321751, 262.043545, 259.322474, 263.534524, 258.561997, 254.155215, 71.305240, 72.142569, 72.497743, 71.153824, 71.156625, 69.120642],
        weekend: [67.896289, 68.557215, 69.224369, 67.835575, 66.845864, 65.510978, 70.192180, 68.527511, 70.276626, 78.586165, 83.131703, 79.579686, 80.881751, 80.603545, 77.882474, 82.094524, 77.121997, 72.715215, 71.305240, 72.142569, 72.497743, 71.153824, 71.156625, 69.120642]
    },
    {
        weekday: [86.451410, 74.116612, 78.684386, 72.948554, 75.462029, 77.103229, 76.687849, 72.895703, 271.020044, 269.582471, 272.833583, 274.086754, 272.440084, 271.249092, 270.571935, 274.349091, 274.971150, 269.448386, 80.686485, 76.597617, 75.007735, 75.136920, 77.423599, 79.433268],
        weekend: [86.451410, 74.116612, 78.684386, 72.948554, 75.462029, 77.103229, 76.687849, 72.895703, 89.580044, 88.142471, 91.393583, 92.646754, 91.000084, 89.809092, 89.131935, 92.909091, 93.531150, 88.008386, 80.686485, 76.597617, 75.007735, 75.136920, 77.423599, 79.433268]
    },
    {
        weekday: [67.649014, 63.136903, 69.672968, 64.656165, 66.591702, 64.769795, 64.315944, 68.403317, 259.744871, 267.814062, 270.036445, 266.351086, 271.159381, 264.151362, 271.945231, 272.354835, 273.227611, 269.626902, 78.582668, 77.336310, 71.674651, 72.991513, 74.620128, 75.564752],
        weekend: [67.649014, 63.136903, 69.672968, 64.656165, 66.591702, 64.769795, 64.315944, 68.403317, 78.304871, 86.374062, 88.596445, 84.911086, 89.719381, 82.711362, 90.505231, 90.914835, 91.787611, 88.186902, 78.582668, 77.336310, 71.674651, 72.991513, 74.620128, 75.564752]
    },
    {
        weekday: [60.173782, 55.082066, 50.822710, 51.265695, 51.085200, 49.224163, 49.576465, 56.352034, 245.797093, 250.773991, 253.692973, 251.045306, 253.160506, 258.209280, 264.731529, 259.653203, 258.211168, 253.816767, 67.016817, 59.353794, 60.917692, 54.018459, 56.054132, 56.950024],
        weekend: [60.173782, 55.082066, 50.822710, 51.265695, 51.085200, 49.224163, 49.576465, 56.352034, 64.357093, 69.333991, 72.252973, 69.605306, 71.720506, 76.769280, 83.291529, 78.213203, 76.771168, 72.376767, 67.016817, 59.353794, 60.917692, 54.018459, 56.054132, 56.950024]
    },
    {
        weekday: [49.846696, 49.925681, 50.207597, 50.035344, 48.451572, 50.034265, 53.734204, 59.494041, 239.544286, 237.753656, 240.857414, 245.316300, 240.817494, 239.120737, 238.601330, 242.059477, 251.494636, 254.073764, 61.037255, 56.432661, 53.410257, 51.856133, 54.268643, 54.331022],
        weekend: [49.846696, 49.925681, 50.207597, 50.035344, 48.451572, 50.034265, 53.734204, 59.494041, 58.104286, 56.313656, 59.417414, 63.876300, 59.377494, 57.680737, 57.161330, 60.619477, 70.054636, 72.633764, 61.037255, 56.432661, 53.410257, 51.856133, 54.268643, 54.331022]
    },
    {
        weekday: [52.453936, 49.470483, 49.610519, 48.928067, 49.411806, 56.584831, 56.698851, 63.375891, 244.058765, 248.048843, 246.772870, 253.458398, 254.308605, 254.717336, 263.556338, 266.321656, 255.277564, 250.637501, 66.337787, 53.981156, 54.251747, 53.731337, 54.321594, 58.780783],
        weekend: [52.453936, 49.470483, 49.610519, 48.928067, 49.411806, 56.584831, 56.698851, 63.375891, 62.618765, 66.608843, 65.332870, 72.018398, 72.868605, 73.277336, 82.116338, 84.881656, 73.837564, 69.197501, 66.337787, 53.981156, 54.251747, 53.731337, 54.321594, 58.780783]
    },
    {
        weekday: [43.639801, 42.970874, 45.287832, 43.002312, 44.807274, 47.441589, 50.018598, 55.748740, 237.616735, 239.585414, 236.719134, 241.097469, 244.093696, 242.387318, 241.810158, 246.232549, 240.893117, 240.891614, 62.309522, 63.364411, 52.716545, 44.393286, 46.321302, 46.874099],
        weekend: [43.639801, 42.970874, 45.287832, 43.002312, 44.807274, 47.441589, 50.018598, 55.748740, 56.176735, 58.145414, 55.279134, 59.657469, 62.653696, 60.947318, 60.370158, 64.792549, 59.453117, 59.451614, 62.309522, 63.364411, 52.716545, 44.393286, 46.321302, 46.874099]
    },
    {
        weekday: [44.203340, 43.911148, 45.361893, 44.849494, 47.942315, 48.650251, 46.867501, 53.420661, 234.563291, 237.443722, 236.025892, 237.787563, 239.008303, 245.602725, 246.031769, 249.786832, 253.789408, 251.531965, 68.981649, 60.767146, 62.617755, 54.424629, 48.661181, 47.912639],
        weekend: [44.203340, 43.911148, 45.361893, 44.849494, 47.942315, 48.650251, 46.867501, 53.420661, 53.123291, 56.003722, 54.585892, 56.347563, 57.568303, 64.162725, 64.591769, 68.346832, 72.349408, 70.091965, 68.981649, 60.767146, 62.617755, 54.424629, 48.661181, 47.912639]
    },
    {
        weekday: [37.912394, 42.960916, 42.823365, 44.632945, 46.509471, 44.192866, 41.790477, 53.679337, 237.930923, 242.404335, 239.343865, 242.064682, 240.127288, 248.759365, 243.285200, 245.081979, 236.831185, 239.519591, 47.621010, 48.141527, 43.721542, 44.398743, 41.766145, 39.656548],
        weekend: [37.912394, 42.960916, 42.823365, 44.632945, 46.509471, 44.192866, 41.790477, 53.679337, 56.490923, 60.964335, 57.903865, 60.624682, 58.687288, 67.319365, 61.845200, 63.641979, 55.391185, 58.079591, 47.621010, 48.141527, 43.721542, 44.398743, 41.766145, 39.656548]
    },
    {
        weekday: [56.122828, 60.181608, 57.553855, 58.066235, 54.430975, 55.836411, 55.018319, 59.656000, 248.370250, 255.496968, 254.090580, 261.403540, 258.724054, 254.270681, 258.083421, 261.551102, 257.834025, 240.915909, 59.388518, 58.133720, 58.345435, 58.287605, 57.004156, 58.387014],
        weekend: [56.122828, 60.181608, 57.553855, 58.066235, 54.430975, 55.836411, 55.018319, 59.656000, 66.930250, 74.056968, 72.650580, 79.963540, 77.284054, 72.830681, 76.643421, 80.111102, 76.394025, 59.475909, 59.388518, 58.133720, 58.345435, 58.287605, 57.004156, 58.387014]
    },
    {
        weekday: [61.851537, 64.776016, 57.633715, 61.131707, 60.692457, 56.322093, 60.449800, 59.518764, 253.721028, 253.717807, 254.216292, 255.844270, 259.043141, 260.487506, 261.922541, 253.285007, 250.259476, 243.410992, 63.617483, 66.668487, 62.629405, 61.422311, 64.516073, 60.491092],
        weekend: [61.851537, 64.776016, 57.633715, 61.131707, 60.692457, 56.322093, 60.449800, 59.518764, 72.281028, 72.277807, 72.776292, 74.404270, 77.603141, 79.047506, 80.482541, 71.845007, 68.819476, 61.970992, 63.617483, 66.668487, 62.629405, 61.422311, 64.516073, 60.491092]
    },
    {
        weekday: [73.345408, 71.473249, 71.379996, 71.267587, 73.330034, 73.097211, 74.112078, 74.679336, 259.989170, 264.413455, 266.421158, 265.629050, 264.357892, 258.971804, 260.438176, 255.571303, 251.558808, 248.417577, 70.868162, 73.146404, 70.383790, 72.057991, 68.488713, 73.365741],
        weekend: [73.345408, 71.473249, 71.379996, 71.267587, 73.330034, 73.097211, 74.112078, 74.679336, 78.549170, 82.973455, 84.981158, 84.189050, 82.917892, 77.531804, 78.998176, 74.131303, 70.118808, 66.977577, 70.868162, 73.146404, 70.383790, 72.057991, 68.488713, 73.365741]
    }
];


// INTERNAL GAINS
let internalGainsDetailed = [
    {
        weekday: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 1050, 1050, 1050, 1050, 1050, 1050],
        weekend: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050]
    },
    {
        weekday: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 1050, 1050, 1050, 1050, 1050, 1050],
        weekend: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050]
    },
    {
        weekday: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 1050, 1050, 1050, 1050, 1050, 1050],
        weekend: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050]
    },
    {
        weekday: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 1050, 1050, 1050, 1050, 1050, 1050],
        weekend: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050]
    },
    {
        weekday: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 1050, 1050, 1050, 1050, 1050, 1050],
        weekend: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050]
    },
    {
        weekday: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 1050, 1050, 1050, 1050, 1050, 1050],
        weekend: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050]
    },
    {
        weekday: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 1050, 1050, 1050, 1050, 1050, 1050],
        weekend: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050]
    },
    {
        weekday: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 1050, 1050, 1050, 1050, 1050, 1050],
        weekend: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050]
    },
    {
        weekday: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 1050, 1050, 1050, 1050, 1050, 1050],
        weekend: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050]
    },
    {
        weekday: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 1050, 1050, 1050, 1050, 1050, 1050],
        weekend: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050]
    },
    {
        weekday: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 1050, 1050, 1050, 1050, 1050, 1050],
        weekend: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050]
    },
    {
        weekday: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 8429, 1050, 1050, 1050, 1050, 1050, 1050],
        weekend: [1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050, 1050]
    }
];

export let internalGains = [
    {occupancy_rate: 541, appliance_rate: 1230, lighting_rate: 1460, total_rate: 3232, occupancy: 1450, appliance: 3295, lighting: 3911, total: 8656, detailed: internalGainsDetailed[0]},
    {occupancy_rate: 544, appliance_rate: 1236, lighting_rate: 1466, total_rate: 3246, occupancy: 1316, appliance: 2990, lighting: 3547, total: 7853, detailed: internalGainsDetailed[1]},
    {occupancy_rate: 559, appliance_rate: 1271, lighting_rate: 1501, total_rate: 3331, occupancy: 1498, appliance: 3404, lighting: 4020, total: 8922, detailed: internalGainsDetailed[2]},
    {occupancy_rate: 517, appliance_rate: 1176, lighting_rate: 1406, total_rate: 3100, occupancy: 1341, appliance: 3048, lighting: 3645, total: 8034, detailed: internalGainsDetailed[3]},
    {occupancy_rate: 559, appliance_rate: 1271, lighting_rate: 1501, total_rate: 3331, occupancy: 1498, appliance: 3404, lighting: 4020, total: 8922, detailed: internalGainsDetailed[4]},
    {occupancy_rate: 554, appliance_rate: 1260, lighting_rate: 1490, total_rate: 3305, occupancy: 1437, appliance: 3266, lighting: 3862, total: 8565, detailed: internalGainsDetailed[5]},
    {occupancy_rate: 523, appliance_rate: 1190, lighting_rate: 1420, total_rate: 3133, occupancy: 1402, appliance: 3186, lighting: 3802, total: 8390, detailed: internalGainsDetailed[6]},
    {occupancy_rate: 559, appliance_rate: 1271, lighting_rate: 1501, total_rate: 3331, occupancy: 1498, appliance: 3404, lighting: 4020, total: 8922, detailed: internalGainsDetailed[7]},
    {occupancy_rate: 536, appliance_rate: 1218, lighting_rate: 1448, total_rate: 3202, occupancy: 1389, appliance: 3157, lighting: 3754, total: 8300, detailed: internalGainsDetailed[8]},
    {occupancy_rate: 541, appliance_rate: 1230, lighting_rate: 1460, total_rate: 3232, occupancy: 1450, appliance: 3295, lighting: 3911, total: 8656, detailed: internalGainsDetailed[9]},
    {occupancy_rate: 554, appliance_rate: 1260, lighting_rate: 1490, total_rate: 3305, occupancy: 1437, appliance: 3266, lighting: 3862, total: 8565, detailed: internalGainsDetailed[10]},
    {occupancy_rate: 523, appliance_rate: 1190, lighting_rate: 1420, total_rate: 3133, occupancy: 1402, appliance: 3186, lighting: 3802, total: 8390, detailed: internalGainsDetailed[11]}
];


// SOLAR GAINS
let solarGainsDetailed = [
    [0, 0, 0, 0, 0, 0, 0, 276, 2343, 6633, 10227, 13953, 14897, 13973, 12181, 8827, 4893, 1244, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 337, 3063, 7033, 10853, 13254, 14702, 14448, 12754, 10112, 6024, 2014, 138, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 110, 1647, 4947, 9066, 11857, 14240, 15510, 15398, 13808, 11896, 7741, 3810, 796, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 664, 3012, 6078, 9454, 12447, 14592, 14523, 14226, 12784, 10067, 7274, 3956, 1088, 37, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 111, 1213, 3732, 6955, 9896, 11755, 13419, 13461, 12476, 11125, 9602, 6814, 3992, 1419, 206, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 177, 1345, 3758, 6575, 9087, 10924, 12390, 12568, 12137, 10398, 9175, 6740, 4413, 1820, 363, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 92, 1132, 3554, 6530, 9135, 11102, 12735, 12161, 12333, 11395, 9779, 7386, 4415, 1774, 377, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 730, 3151, 6597, 9849, 12466, 13247, 14452, 14681, 12347, 10922, 7782, 4539, 1402, 156, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 297, 2644, 6287, 9512, 11534, 13281, 13179, 12725, 11708, 9800, 6507, 2944, 445, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 55, 1725, 5411, 9461, 12718, 15121, 14845, 14509, 12613, 8952, 4833, 1244, 23, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1054, 4541, 8441, 12306, 14471, 14813, 14080, 12157, 7917, 3715, 681, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 423, 2925, 7234, 11072, 13912, 14500, 13460, 10955, 7417, 3309, 612, 0, 0, 0, 0, 0, 0]
];


export let solarGains = [
    {
        detailed: solarGainsDetailed[0],
        walls: [{ id: 'wall1', heatFlowRate: 90, gain: 242 }, { id: 'wall2', heatFlowRate: 9, gain: 25 }, { id: 'wall3', heatFlowRate: -9, gain: -23 }, { id: 'wall4', heatFlowRate: 18, gain: 48 }, { id: 'roof', heatFlowRate: 30, gain: 80 }],
        windows: [{ id: 'win1', heatFlowRate: 2233, gain: 5980 }, { id: 'win2', heatFlowRate: 447, gain: 1198 }, { id: 'win3', heatFlowRate: 293, gain: 785 }, { id: 'win4', heatFlowRate: 615, gain: 1648 }],
        total_rate: 3727,
        total: 9983
    }
];


// TOTAL GAINS
// these are the hourly gains (solar + internal)
export let totalGainsDetailed = internalGainsDetailed.map((intGains, idx) => ({
    weekday: MathHelper.arrayAdd(intGains.weekday, solarGainsDetailed[idx]),
    weekend: MathHelper.arrayAdd(intGains.weekend, solarGainsDetailed[idx])
}));


// INDOOR CONDITIONS
export let averageIndoorConditions = {
    heating: [18.9741, 19.7124, 20.5312, 20.7238, 20.9464, 21, 21, 21, 21, 20.6535, 20.288, 19.5393],
    cooling: [24.073, 24.1482, 24.3901, 24.9301, 24.9846, 25.2469, 25.629, 25.4058, 25.1067, 24.6337, 24.2693, 24.1396]
};



//=========   INPUTS   ==========

export let buildingSettings = {
    floor_area: 336,              // m2
    occupants: 17,                // people
    occupant_density: 20.0,       // m2/person (this can be area/occupants)
    metabolic_load: 88,           // W/person
    appliance_load: 10.0,         // W/m2
    lighting_load: 10.0,          // W/m2
    building_height: 7.5,
    heat_capacity_type: "heavy",
    outdoor_air_flow_rate: 10.0,

    daylighting_factor: 1,
    lighting_occupancy_factor: 1,
    constant_illumination_factor: 1,
    incl_parasitic_lighting: true,
    annual_parasitic_load: 6,

    // HVAC
    hvac_system_type: 0,
    ventilation_type: 1,
    air_leakage_level: 1.1,
    exhaust_air_recirculation_percent: 0
};

// weekday and weekend usage factors for each hour of a representative day
export let hourlyConditions = [
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
        id: "wall1",
        type: "wall",
        orientation: "S",
        area: 73.5,
        u_value: 0.353,
        absorptivity: 0.7,
        emissivity: 0.7
    },
    {
        id: "win1",
        type: "window",
        orientation: "S",
        area: 31.5,
        u_value: 3.094,
        emissivity: 0.84,
        solar_transmittance: 0.7,
        reduction_factor_Z_for_temporary: 1
    },
    {
        id: "wall2",
        type: "wall",
        orientation: "E",
        area: 42.0,
        u_value: 0.353,
        absorptivity: 0.7,
        emissivity: 0.7
    },
    {
        id: "win2",
        type: "window",
        orientation: "E",
        area: 18.0,
        u_value: 3.094,
        emissivity: 0.84,
        solar_transmittance: 0.7,
        reduction_factor_Z_for_temporary: 1
    },
    {
        id: "wall3",
        type: "wall",
        orientation: "N",
        area: 73.5,
        u_value: 0.353,
        absorptivity: 0.7,
        emissivity: 0.7
    },
    {
        id: "win3",
        type: "window",
        orientation: "N",
        area: 31.5,
        u_value: 3.094,
        emissivity: 0.84,
        solar_transmittance: 0.7,
        reduction_factor_Z_for_temporary: 1
    },
    {
        id: "wall4",
        type: "wall",
        orientation: "W",
        area: 42.0,
        u_value: 0.353,
        absorptivity: 0.7,
        emissivity: 0.7
    },
    {
        id: "win4",
        type: "window",
        orientation: "W",
        area: 18.0,
        u_value: 3.094,
        emissivity: 0.84,
        solar_transmittance: 0.7,
        reduction_factor_Z_for_temporary: 1
    },
    {
        id: "roof",
        type: "roof",
        area: 112.0,
        u_value: 0.247,
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
        temp: 3.95935397039031,
        wind_speed: 4.5611036339165,
        avg_solar_S: 166.12566700312,
        avg_solar_SE: 119.482467142232,
        avg_solar_E: 64.4930149232445,
        avg_solar_NE: 32.6406494216118,
        avg_solar_N: 30.175006978882,
        avg_solar_NW: 37.6795727730594,
        avg_solar_W: 85.1155706726631,
        avg_solar_SW: 143.726807873259,
        avg_solar_HOR: 115.85464333782,
        solar_altitude: 22.4,
        dry_air_humidity: 3.60,
        atmospheric_pressure: 98645,
        relative_humidity: 65,
        dew_point: -3.033512786,
        sky_cover: 0.616689098,
        sky_temp: 260.3223678,
        solar_transmittance: 0.9243,
        hourly_horiz_solar_rad: [0,	0, 0, 0, 0, 0, 0, 8.58064516129032, 72.741935483871, 205.903225806452, 317.451612903226, 433.129032258065, 462.41935483871, 433.741935483871, 378.129032258065, 274, 151.903225806452, 38.6129032258064, 0.161290322580645, 0, 0, 0, 0, 0],
        hourly_dry_bulb_temp: [2.6161, 2.2645, 1.8677, 1.5387, 1.1613, 0.9548, 0.8258, 0.7871, 1.5065, 2.9677, 4.2516, 5.5968, 6.5226, 7.2419, 7.8129, 7.8258, 7.2581, 6.4677, 5.6032, 5.0935, 4.4710, 4.0258, 3.4355, 3.1323],
        hourly_wind_speed: [4.229032, 4.270968, 4.312903, 4.219355, 4.151613, 4.061290, 4.370968, 4.261290, 4.354839, 4.893548, 5.183871, 4.970968, 5.058065, 5.045161, 4.877419, 5.141935, 4.825806, 4.538710, 4.470968, 4.522581, 4.541935, 4.451613, 4.448387, 4.312903]
    },
    {
        mon: "feb",
        temp: 7.932738,
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
        solar_transmittance: 0.9247,
        hourly_dry_bulb_temp: [6.2786, 5.5429, 5.0964, 4.5036, 4.2643, 4.0571, 3.7214, 3.8857, 5.0536, 6.8429, 8.3571, 9.7429, 10.9964, 11.9750, 12.6429, 12.6179, 12.4250, 11.4071, 10.5179, 9.6821, 8.6107, 7.9500, 7.3929, 7.0107],
        hourly_wind_speed: [5.435714, 4.653571, 4.942857, 4.571429, 4.732143, 4.835714, 4.807143, 4.564286, 5.582143, 5.507143, 5.714286, 5.800000, 5.710714, 5.646429, 5.610714, 5.839286, 5.875000, 5.532143, 5.110714, 4.842857, 4.732143, 4.735714, 4.878571, 5.003571]
    },
    {
        mon: "mar",
        temp: 13.766532,
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
        solar_transmittance: 0.8805,
        hourly_dry_bulb_temp: [11.8226, 11.1452, 10.5710, 10.0548, 9.6968, 9.3742, 9.1774, 9.8097, 11.1290, 12.6742, 14.4387, 15.6871, 16.6484, 17.5452, 18.3484, 18.6516, 18.5194, 17.8742, 16.7645, 15.8581, 14.8613, 14.0645, 13.1226, 12.4452],
        hourly_wind_speed: [4.270968, 3.958065, 4.396774, 4.054839, 4.183871, 4.058065, 4.025806, 4.306452, 4.925806, 5.441935, 5.593548, 5.377419, 5.683871, 5.258065, 5.751613, 5.780645, 5.832258, 5.603226, 5.029032, 4.961290, 4.570968, 4.648387, 4.745161, 4.800000]
    },
    {
        mon: "apr",
        temp: 17.209444,
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
        solar_transmittance: 0.8167,
        hourly_dry_bulb_temp: [13.5833, 13.0033, 12.8800, 12.3533, 11.8333, 11.3667, 11.9433, 14.3633, 16.3267, 18.2433, 19.9067, 21.4267, 22.1900, 22.8300, 23.1200, 23.1033, 22.8400, 21.7433, 19.9633, 18.2533, 16.9867, 15.6733, 14.8800, 14.3667],
        hourly_wind_speed: [3.770000, 3.400000, 3.083333, 3.113333, 3.096667, 2.953333, 2.983333, 3.503333, 4.043333, 4.396667, 4.610000, 4.443333, 4.573333, 4.896667, 5.310000, 4.986667, 4.896667, 4.623333, 4.230000, 3.713333, 3.836667, 3.346667, 3.486667, 3.546667]
    },
    {
        mon: "may",
        temp: 20.833468,
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
        solar_transmittance: 0.7456,
        hourly_dry_bulb_temp: [17.2935, 16.8903, 16.2452, 15.9452, 15.7290, 15.7774, 16.5484, 18.3355, 20.4645, 22.3516, 23.8484, 24.9000, 25.6742, 25.4903, 26.2387, 26.2000, 25.5548, 24.7645, 23.2903, 21.6581, 20.4710, 19.5613, 18.7903, 18.1194],
        hourly_wind_speed: [3.022581, 3.032258, 3.061290, 3.051613, 2.925806, 3.048387, 3.322581, 3.722581, 3.641935, 3.503226, 3.712903, 4.016129, 3.696774, 3.577419, 3.535484, 3.780645, 4.429032, 4.606452, 3.796774, 3.480645, 3.267742, 3.158065, 3.341935, 3.351613]
    },
    {
        mon: "jun",
        temp: 24.795556,
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
        solar_transmittance: 0.6901,
        hourly_dry_bulb_temp: [21.1133, 20.4033, 19.9267, 19.5733, 19.0700, 19.3300, 20.5433, 22.5167, 24.7967, 26.5933, 28.0967, 28.9833, 29.8067, 30.3000, 30.3133, 30.1433, 29.7600, 29.0633, 27.8333, 25.4767, 24.0300, 23.1133, 22.4400, 21.9100],
        hourly_wind_speed: [3.193333, 2.973333, 2.986667, 2.936667, 2.976667, 3.506667, 3.506667, 3.963333, 3.930000, 4.190000, 4.093333, 4.533333, 4.583333, 4.606667, 5.170000, 5.343333, 4.646667, 4.346667, 4.133333, 3.283333, 3.310000, 3.276667, 3.323333, 3.646667]
    },
    {
        mon: "jul",
        temp: 26.061022,
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
        solar_transmittance: 0.7217,
        hourly_dry_bulb_temp: [23.0774, 22.5387, 21.9710, 21.5806, 21.4097, 21.3484, 22.0065, 23.8387, 25.7484, 27.1774, 28.5258, 29.4935, 30.3548, 30.6258, 30.9677, 31.0903, 30.4355, 29.8065, 28.2129, 26.5935, 25.5968, 25.0548, 24.3290, 23.7742],
        hourly_wind_speed: [2.506452, 2.454839, 2.641935, 2.461290, 2.606452, 2.812903, 3.006452, 3.419355, 3.467742, 3.600000, 3.387097, 3.693548, 3.896774, 3.777419, 3.735484, 4.038710, 3.674194, 3.677419, 3.858065, 3.938710, 3.190323, 2.451613, 2.712903, 2.758065]
    },
    {
        mon: "aug",
        temp: 26.550134,
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
        solar_transmittance: 0.7905,
        hourly_dry_bulb_temp: [23.8452, 23.6710, 23.3419, 22.9355, 22.6871, 22.5452, 22.9032, 24.2226, 25.7097, 27.4581, 28.7935, 29.6774, 30.3032, 30.9355, 30.9613, 31.1000, 30.4613, 29.4806, 28.3742, 26.9419, 26.0806, 25.3548, 24.9194, 24.3774],
        hourly_wind_speed: [2.548387, 2.525806, 2.641935, 2.603226, 2.845161, 2.900000, 2.761290, 3.248387, 3.245161, 3.445161, 3.335484, 3.458065, 3.541935, 3.996774, 4.025806, 4.277419, 4.545161, 4.403226, 4.306452, 3.758065, 3.890323, 3.316129, 2.890323, 2.835484]
    },
    {
        mon: "sep",
        temp: 22.529167,
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
        solar_transmittance: 0.8613,
        hourly_dry_bulb_temp: [19.9900, 19.6467, 19.4100, 19.2133, 18.9100, 18.8733, 19.1867, 20.6167, 22.2933, 23.6933, 25.0000, 25.8533, 26.3800, 26.3133, 26.6267, 26.2633, 25.8933, 24.8867, 23.5433, 22.7833, 22.1700, 21.5600, 20.9533, 20.4867],
        hourly_wind_speed: [2.043333, 2.466667, 2.456667, 2.603333, 2.753333, 2.570000, 2.373333, 3.286667, 3.516667, 3.823333, 3.596667, 3.783333, 3.643333, 4.240000, 3.863333, 3.990000, 3.410000, 3.610000, 2.816667, 2.860000, 2.516667, 2.573333, 2.363333, 2.190000]
    },
    {
        mon: "oct",
        temp: 16.031183,
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
        solar_transmittance: 0.9081,
        hourly_dry_bulb_temp: [13.6516, 13.2484, 12.8129, 12.2032, 11.9290, 11.5710, 11.2645, 12.6387, 14.6581, 16.5355, 18.4613, 19.4806, 20.2452, 21.0613, 21.4161, 21.3452, 20.5903, 18.8129, 17.5194, 16.2548, 15.6032, 14.9097, 14.4774, 13.8290],
        hourly_wind_speed: [3.480645, 3.767742, 3.577419, 3.609677, 3.345161, 3.445161, 3.383871, 3.725806, 4.206452, 4.693548, 4.619355, 5.106452, 4.945161, 4.667742, 4.909677, 5.135484, 4.893548, 3.722581, 3.722581, 3.648387, 3.661290, 3.648387, 3.551613, 3.645161]
    },
    {
        mon: "nov",
        temp: 11.945833,
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
        solar_transmittance: 0.9294,
        hourly_dry_bulb_temp: [9.7900, 9.0933, 8.6067, 8.1367, 7.6500, 7.4067, 7.0900, 7.4167, 9.2767, 11.4633, 13.5533, 14.9733, 16.1800, 17.3333, 17.8333, 17.8400, 16.8667, 15.0567, 13.8667, 12.8600, 12.1067, 11.2767, 10.7400, 10.0267],
        hourly_wind_speed: [3.860000, 4.056667, 3.556667, 3.800000, 3.766667, 3.456667, 3.746667, 3.683333, 4.526667, 4.540000, 4.586667, 4.703333, 4.920000, 5.023333, 5.120000, 4.560000, 4.350000, 3.870000, 4.013333, 4.213333, 3.930000, 3.840000, 4.050000, 3.766667]
    },
    {
        mon: "dec",
        temp: 7.689799,
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
        solar_transmittance: 0.9374,
        hourly_dry_bulb_temp: [5.9871, 5.3871, 4.7968, 4.4065, 4.0710, 3.8968, 3.7129, 3.5387, 5.0871, 6.8677, 8.5968, 10.0516, 11.1548, 12.1677, 12.6452, 12.5355, 11.7387, 10.5355, 9.4516, 8.8419, 8.0194, 7.4742, 7.0000, 6.7742],
        hourly_wind_speed: [4.606452, 4.480645, 4.470968, 4.461290, 4.593548, 4.577419, 4.641935, 4.677419, 4.903226, 5.190323, 5.325806, 5.287097, 5.216129, 4.883871, 4.980645, 4.667742, 4.400000, 4.183871, 4.467742, 4.612903, 4.425806, 4.532258, 4.293548, 4.612903]
    }
];
