#!/usr/bin/env nodejs

require('./lib/abi')

var point_main = require('./examples/point');
var multiple_main = require('./examples/multiple');

require('./examples/point_manual');
require('./examples/multiple_manual');

console.log("-- point -------------------------------------");
point_main();
console.log("-- multiple ----------------------------------");
multiple_main();
