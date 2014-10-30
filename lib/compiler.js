var Meta = require('./metadata')
var Layout = require('./layout')
var extend = require('util')._extend;

function copyOffsets(m) { return extend({}, m); }
function compile() { Meta.getClasses().forEach(compileClass); }
module.exports = compile;

function compileClass(c) {
    // {{{
    // ANSWER HERE
    // }}}
}
