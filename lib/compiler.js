var Meta = require('./metadata')
var Layout = require('./layout')
var extend = require('util')._extend;

function copyOffsets(m) { return extend({}, m); }
function compile() { Meta.getClasses().forEach(compileClass); }
module.exports = compile;

function compileClass(c) {
    // {{{
    var casts = {};
    var size = 0;
    for (var i = 0; i < c.inherits.length; i++){
        casts[c.inherits[i]] = size;
        size += Meta.sizeof(c.inherits[i]);
    }
    Meta.setCasts(c.name, casts);
    Meta.setParents(c.name, c.inherits);
    if (size == 0) {size = 1}; // If c doesn't have parents, we need to create a vtable entry for c
    for (var i = 0; i < c.data.length; i++) {
        Meta.setDataOffset(c.name + "::" + c.data[i], size);
        size ++;
    }
    Meta.setSizeof(c.name, size);

    c.nonvirtual.forEach(function(fun) {
        Meta.setGlobal(c.name, fun.name, fun.impl);
    });

    vOffsets = {}
    for (var i = 0; i < c.virtual.length; i++) {
        vOffsets[c.virtual[i].name] = i;
    }
    Meta.setVirtualOffsets(c.name, vOffsets);

    var layouts = []; size = 0;
    if (c.inherits.length == 0) {
        var vtable = [];
        for (var i = 0; i < c.virtual.length; i++) {
            vtable.push(Layout.VEntry(c.virtual[i].impl, c.name, 0));
        }
        Meta.setTemplate(c.name, [Layout.Layout(0, c.name, vtable)]);
    }
    else {
        for (var i = 0; i < c.inherits.length; i++) {
            var template = Meta.getTemplate(c.inherits[i]);
            var vtable = [];
            for (var j = 0; j < template[0].vtable.length; j++) {
                vtable.push(template[0].vtable[j]);
            }
            if (size == 0)
                layouts.push(Layout.Layout(0, c.name, vtable));
            else
                layouts.push(Layout.Layout(size, c.inherits[i], vtable)); 
            size += Meta.sizeof(c.inherits[i]);
        }
        c.virtual.forEach(function(fun) {
            for (var i = 0; i < c.inherits.length; i++) {
                var parent = c.inherits[i];
                if (Meta.hasVirtualOffset(parent, fun.name)) {
                    var vtable = layouts[i].vtable;
                    vtable[Meta.getVirtualOffset(parent, fun.name)]
                        = Layout.VEntry(fun.impl, c.name, -layouts[i].offset);
                }
                else {
                    var vtable = layouts[i].vtable;
                    console.log(vtable);
                    vtable.push(Layout.VEntry(fun.impl, c.name, -layouts[i].offset));
                }
            }
        });
        Meta.setTemplate(c.name, layouts);
    }
    // }}}
}
