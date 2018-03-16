'use strict';
var bzThermalModel = require('./lib/thermal/model');
var bzPhotovoltaicModel = require('./lib/photovoltaic/model');

exports.thermal = bzThermalModel;
exports.photovoltaic = bzPhotovoltaicModel;

// module.exports = {
//     thermal: bzThermalModel,
//     photovoltaic: bzPhotovoltaicModel
// };