
// Clause 8.x - Heat Transfer by Transmission (pages 33-38)


// 8.2 - Total heat transfer by transmission (page 33)
// unit = MJ (megajoules)
//
// Input:
//  * transmission heat transfer coefficient (watts/kelvin)
//  * set point for the internal environment (celsius)
//  * avg external climate temperature for the given time period (celsius)
//  * time period length (seconds)
//
// Output:
//   818.94 (megajoules)
//
// Calculation Example:
//   transferCoefficient = 18.2 W/K
//   january = 2.678400 Ms
//   set point = 20C for heating
//   external temp january = 3.2C
// Result:
//   818.947584 MJ
export function heatTransferByTransmission(transferCoefficient, setPoint, climateExternalTemp, timePeriodSeconds) {
    // W/K (watts/kelvin) * C (celsius) * Ms (megasecond) = MJ (megajoule)
    return transferCoefficient * (setPoint - climateExternalTemp) * (timePeriodSeconds / 1000000);
}


// 8.3 - Transmission heat transfer coefficient (page 34)
// unit = W/K (watts/kelvin)
//
// Input:
//  * array of all external facing walls (area & u_value)
//  * array of all external facing windows (area & u_value)
//
// Output:
//  18.2 (watts/kelvin)
//
// Calculation Example:
//  walls =
//  windows =
// Result:
//  18.2 W/K
export function heatTransferByTransmissionCoefficient(walls, windows) {
    // overall coefficient is the sum of 4 individual coefficients:
    // external air, ground, unconditioned spaces, adjacent spaces

    // coefficient due to external environment
    let external = transmissionCoefficientByExternal(walls, windows);

    // TODO: coefficient due to ground
    let ground = 0;

    // coefficient due to "unconditioned spaces"  (not applicable for single zone)
    // coefficient due to "adjacent buildings"    (not applicable for single zone)

    return external;
}


// The general equation for each individual transmission coefficient is given by:
//     Hx = btr,x * [ΣiAi*Ui + Σklk*Ψk + Σjχj]

// To do this calculation we need to have 3 sets of definitions:
//  1. building elements (i) including area and u-value
//  2. all linear thermal bridges (k) including length and linear thermal transmittence
//  3. all point thermal bridges (j) including point thermal transmittence
//  4. the adjustment factor (b) determined by 8.3.2


// Transmission heat transfer coefficient due to external environment
// unit = watts/kelvin
function transmissionCoefficientByExternal(walls, windows) {

    // wall elements
    let wallTransfers = walls.map((wall) => wall.area * wall.u_value);
    let wallCoefficient = wallTransfers.reduce((a, b) => a + b, 0);

    // window (glazed) elements
    let windowTransfers = windows.map((win) => win.area * win.u_value);
    let windowCoefficient = windowTransfers.reduce((a, b) => a + b, 0);

    // 8.3.2.2.1 provides an equation which adjusts the u-value for a window if
    // that window uses shutters intermittently over the time period.
    // See G.2.2.2 for greater details and an example

    // TODO: calculate transfer due to thermal bridges
    // TODO: calculate transfer due to point thermal bridges

    // NOTE: there is NO adjustment factor in the case where the transmittence
    //       is happening to the external air, so we skip that in this calc

    return wallCoefficient + windowCoefficient;
}
