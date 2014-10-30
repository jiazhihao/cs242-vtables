var adt = require('adt'), data = adt.data, only = adt.only;

/**
 * Typed pointers to arrays.  The backing array is mutable, but pointers
 * themselves are pure.  Since JavaScript doesn't have a type, we build
 * in the type of a pointer into the data type itself; casting changes
 * the type (and might change the offset too, in C++).
 */

var Ptr = data(function () {
    return { Ptr : {
        array : adt.any, // only(Array),
        offset : only(Number),
        type : only(String)
    } };
});

Ptr.prototype.deref = function(d) {
    if (this.array === undefined) {
        throw new Error("Null pointer dereference");
    }
    if (this.offset + d < 0 || this.offset + d >= this.array.length) {
        throw new Error("Out of bounds pointer reference");
    }
    return this.array[this.offset + d];
}
Ptr.prototype.write = function(d, x) {
    if (this.array === undefined) {
        throw new Error("Null pointer dereference");
    }
    if (this.offset + d < 0 || this.offset + d >= this.array.length) {
        throw new Error("Out of bounds pointer reference");
    }
    this.array[this.offset + d] = x;
}
Ptr.prototype.add = function(d, ty) {
    return Ptr.Ptr(this.array, this.offset + d, ty);
}
Ptr.prototype.assertType = function(ty) {
    if (this.type != ty) {
        throw new Error("Could not match expected type " + ty + " with actual type " + this.type);
    }
}

Ptr.null = function(ty) {
    return Ptr.Ptr(undefined, 0, ty);
}

module.exports = Ptr;
