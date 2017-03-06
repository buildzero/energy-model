
// solar heat gains per hour-of-day
//   * start by getting the total gains for the month
//   * then divide that by monthly time period (Ms) to get the gains in watts
//   * then multiply that by 24 to get the gains per day
//   * finally, the gains for an hour = gains per day * global horizontal radiation / total horizontal radiation
//        NOTE: in effect the final term here is the ratio of radition for the given hour vs total radiation for the day,
//              so the net impact of the calculation is to divvy up the gains according to the % of radiation each hour.

// internal heat gains per hour-of-day
//   * start with the internal heat gain factor per hour-of-day and multiply it by floor space

// total heat gains per hour-of-day
//   * simply add the values from solar and internal gains per hour-of-day


// heatGains per month and hour-of-day split between weekend and weekdays
// Hve,cool/Hve,heat (ventilation coefficient) per month and hour-of-day split between weekend and weekdays


export function setPoints(usageSettings) {
    // initial temp = set point temp of 24th hour of day

    // Thursday, Tue/Wed/Thu/Fri, Saturday, Sunday, Monday
    // 2 blocks of 12 calculations, each spanning 24 hours of time
    // Thursday first hour = calc, other hours = conditional
    // Rest of days the hour = calc

    // next hour =(C420-D819-AB381/(AB394+$D$173))*EXP(-(AB394+$D$173)/$D$313*AB$379)+D819+AB381/(AB394+$D$173)
    // next hour = (initialTemp-dbTemp-heatGain / (Hve,cool + Htr)) * exp(-(Hve,cool + Htr)/(M * duration)) + dbTemp + heatGain/(Hve,cool + Htr)

    // D173 = Htr = Heat Transfer Transmission Coefficient
    // D313 = M (Wh/K) = envelopeHeatCapacity * floorArea / 3600
    // D819 = climate dry-bulb-temp for given month and hour-of-day
    // AB379 = hour-of-day duration (weekday vs weekend)
    // AB381 = monthly heat gain
    // AB394 = monthly Hve,cool

    // Day Avg
    // Week Avg

}
