# BuildZero.org Energy Model
An implementation of ISO 13790-2008 and limited to only single-zone building definitions, written in javascript.

[![Latest Release](https://img.shields.io/github/release/buildzero/energy-model.svg?label=latest%20release)](https://github.com/buildzero/energy-model/releases)
[![GitHub license](https://img.shields.io/badge/License-MIT-yellow.svg)](https://raw.githubusercontent.com/buildzero/energy-model/master/LICENSE.txt)

# Capabilities

# Installation (npm)

```
npm install --save buildzero-energy-model
```

# Usage

```
var EnergyModel = require('buildzero-energy-model');

// check out the example.js file to see what the input data structures are meant to look like.  
// better docs coming once things are more finalized.
var modelResults = EnergyModel.thermalDemand(buildingSettings, hourlyConditions, buildingElements, climateData);
```


# License

Unless otherwise specified all BuildZero.org source files are made available under the terms of the MIT License (MIT).  See [LICENSE.txt](https://github.com/buildzero/energy-model/blob/master/LICENSE.txt) for details.

All files © 2017 BuildZero.org
