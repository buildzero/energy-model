
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
