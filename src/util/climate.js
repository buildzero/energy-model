
export function surfaceHeatResistence(windSpeed) {
    // The external surface resistance <source: ISO 6946:2007 TableA.2>
    // Wind speed -> Rse
    // 1             0.08
    // 2             0.06
    // 3             0.05
    // 4             0.04
    // 5             0.04
    // 7             0.03
    // 10            0.02

    if (windSpeed <= 1.5) {
        return 0.08;
    } else if (windSpeed <= 2.5) {
        return 0.06;
    } else if (windSpeed <= 3.5) {
        return 0.05;
    } else if (windSpeed <= 4.5) {
        return 0.04;
    } else if (windSpeed <= 6.0) {
        return 0.04;
    } else if (windSpeed <= 8.5) {
        return 0.03;
    } else {
        return 0.02;
    }
}
