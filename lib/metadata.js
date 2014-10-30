/**
 * The compiler metadata API.  As you compile a class definition,
 * you will make decisions about the data layout and vtable layout
 * of your definitions.  The functions in this module are responsible
 * for storing this information for you, so that the client code can
 * look things up.
 *
 * In a real compiler, most of these definitions would be inlined
 * straight into their use-sites, or simply exist as static compile
 * time data shipped with the binary.
 */

require("util-is");
var util = require("util");
var assert = require("assert");
var Layout = require("./layout");
var Class = require("./class");

var classes = [];
var data_offsets = {};
var all_virtual_offsets = {};
var sizes = {}
var globals = {}
var templates = {}
var all_casts = {}
var all_parents = {}

function getClasses() {
    return classes;
}
exports.getClasses = getClasses;

Class.define = function(info) {
    classes.push(Class.Class.create(info));
}

function hasDataOffset(ty, sym) {
    return ty + "::" + sym in data_offsets;
}
exports.hasDataOffset = hasDataOffset;

function getDataOffset(ty, sym) {
    return data_offsets[ty + "::" + sym];
}
exports.getDataOffset = getDataOffset;

function getVirtualOffset(ty, sym) {
    return all_virtual_offsets[ty][sym];
}
exports.getVirtualOffset = getVirtualOffset;

function hasVirtualOffset(ty, sym) {
    return sym in all_virtual_offsets[ty];
}
exports.hasVirtualOffset = hasVirtualOffset;

function getVirtualOffsets(ty) {
    return all_virtual_offsets[ty];
}
exports.getVirtualOffsets = getVirtualOffsets;

function getParents(sym) {
    return all_parents[sym];
}
exports.getParents = getParents;

function getCast(ty_from, ty_to) {
    return all_casts[ty_from][ty_to];
}
exports.getCast = getCast;

function getCasts(ty_from) {
    return all_casts[ty_from];
}
exports.getCasts = getCasts;

function sizeof(sym) {
    return sizes[sym];
}
exports.sizeof = sizeof;

function getGlobal(ty, sym) {
    return globals[ty + "::" + sym];
}
exports.getGlobal = getGlobal;

function hasGlobal(ty, sym) {
    return ty + "::" + sym in globals;
}
exports.hasGlobal = hasGlobal;

function getTemplate(sym) {
    return templates[sym];
}
exports.getTemplate = getTemplate;

function setParents(sym, parents) {
    assert(util.isArray(parents));
    parents.forEach(function(x) {assert(util.isString(x))});
    all_parents[sym] = parents;
}
exports.setParents = setParents;

function setDataOffset(sym, off) {
    assert(util.isNumber(off));
    data_offsets[sym] = off;
}
exports.setDataOffset = setDataOffset;

function setVirtualOffsets(sym, offs) {
    assert(util.isPureObject(offs));
    for (var name in offs) {
        assert(util.isNumber(offs[name]));
    }
    all_virtual_offsets[sym] = offs;
}
exports.setVirtualOffsets = setVirtualOffsets;

function setSizeof(sym, size) {
    assert(util.isNumber(size));
    sizes[sym] = size;
}
exports.setSizeof = setSizeof;

function setGlobal(ty, sym, global) {
    assert(util.isFunction(global));
    globals[ty + "::" + sym] = global;
}
exports.setGlobal = setGlobal;

function setTemplate(sym, template) {
    assert(util.isArray(template));
    template.forEach(function (x) {
        assert(x.isLayout);
    })
    templates[sym] = template;
}
exports.setTemplate = setTemplate;

function setCasts(sym, casts) {
    assert(util.isPureObject(casts));
    for (var name in casts) {
        assert(util.isNumber(casts[name]));
    }
    all_casts[sym] = casts;
}
exports.setCasts = setCasts;

function dump() {
    console.log("data_offsets = ", util.inspect(data_offsets, false, 10));
    console.log("all_virtual_offsets = ", util.inspect(all_virtual_offsets, false, 10));
    console.log("sizes = ", util.inspect(sizes, false, 10));
    console.log("globals = ", util.inspect(globals, false, 10));
    console.log("all_casts = ", util.inspect(all_casts, false, 10));
    console.log("all_parents = ", util.inspect(all_parents, false, 10));
    console.log("templates = ", util.inspect(templates, false, 10));
}
exports.dump = dump;
