
export function internalHeatCapacityByType(type) {
    // Taken from 12.3.1.2 (page 68)
    // Class 	       Am factor	    Seasonal, Monthly    Hourly Cm (J/K)
    // Very Light:    80,000 * Af 	    2.5	                 80,000 	 *Af
    // Light :        110,000 * Af 	    2.5	                 110,000 	 *Af
    // Medium:        165,000 * Af 	    2.5	                 165,000 	 *Af
    // Heavy:         260,000 * Af 	    3	                 260,000 	 *Af
    // Very heavy:    370,000 * Af 	    3.5	                 370,000 	 *Af
    if (type === "vlight") {
        return 80000;
    } else if (type === "light") {
        return 110000;
    } else if (type === "heavy") {
        return 260000;
    } else if (type === "vheavy") {
        return 370000;
    } else {
        // default is "medium"
        return 165000;
    }
}


export function vsite(terrain) {
    // Terrain Class <Source: EN 15242:2007 Table A.1 Page38>
    // Terrain Class	vsite/vmetro
    // Open terrain	    1.0
    // Country	        0.9
    // Urban / City	    0.8
    if (terrain === "open") {
        return 1.0;
    } else if (terrain === "country") {
        return 0.9;
    } else {
        // default is "urban"
        return 0.8;
    }
}


export function windowOpeningAngleCk(angle) {
    // Window opening angle for natural ventilation
    // Angle	Ck(α)
    // 0 ⁰	    0
    // 5 ⁰	    0.09
    // 10 ⁰	    0.17
    // 15 ⁰	    0.25
    // 20 ⁰	    0.33
    // 25 ⁰	    0.39
    // 30 ⁰	    0.46
    // 45 ⁰	    0.62
    // 60 ⁰	    0.74
    // 90 ⁰ 	0.9
    // 180 ⁰	1
    if (angle < 2.5) {
        return 0;
    } else if (angle < 7.5) {
        return 0.09;
    } else if (angle < 12.5) {
        return 0.17;
    } else if (angle < 17.5) {
        return 0.25;
    } else if (angle < 22.5) {
        return 0.33;
    } else if (angle < 27.5) {
        return 0.39;
    } else if (angle < 37.5) {
        return 0.46;
    } else if (angle < 52.5) {
        return 0.62;
    } else if (angle < 75) {
        return 0.74;
    } else if (angle < 135) {
        return 0.9;
    } else {
        return 1.0;
    }
}


export function heatRecoveryEfficiency(heatRecoveryType) {
    // expect heatRecoveryType is one of: none, heat_exch, two_elem, load_cooling, heat_pipes, slow_rotating

    // Heat recovery system efficiency <Source: NEN 2916 Table 6>
    // Heat recovery system	                                    η : HR efficiency
    // No heat recovery	                                        0
    // Heat exchange plates or pipes (0.65)	                    0.65
    // Two-elements-system (0.6)	                            0.6
    // Loading cold with air-conditioning (0.4)	                0.4
    // Heat-pipes (0.6)               	                        0.6
    // Slowly rotating or intermittent heat exchangers (0.7)	0.7
    if (heatRecoveryType === "heat_exch") {
        return 0.65;
    } else if (heatRecoveryType === "two_elem") {
        return 0.6;
    } else if (heatRecoveryType === "load_cooling") {
        return 0.4;
    } else if (heatRecoveryType === "heat_pipes") {
        return 0.6;
    } else if (heatRecoveryType === "slow_rotating") {
        return 0.7;
    } else {
        // default is "none", meaning no heat recovery
        return 0;
    }
}
