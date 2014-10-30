var Ptr = require("./pointer");
var Meta = require("./metadata");

Ptr.prototype.setMember = function(member, x) {
    var ptr = this.autocast(member);
    // {{{
    // ANSWER HERE
    // }}}
}

Ptr.prototype.getMember = function(member) {
    var ptr = this.autocast(member);
    // {{{
    // ANSWER HERE
    // }}}
}

Ptr.prototype.vcall = function(method, args) {
    var ptr = this.autocast(method);
    if (!ptr) {
        throw new Error("Method " + method + " not implemented in class or any of its parents");
    }
    var f, shifted_ptr;
    // {{{
    // ANSWER HERE (place the function in the variable f
    // and the appropriately adjusted pointer in shifted_ptr)
    // }}}
    args.unshift(shifted_ptr); // push thiz onto arguments list
    return f.apply(undefined, args);
}

Ptr.prototype.call = function(method, args) {
    var ptr = this.autocast(method);
    var f;
    // {{{
    // ANSWER HERE (place the function in the variable f)
    // }}}
    args.unshift(ptr);
    return f.apply(undefined, args);
}

Ptr.new_ = function(name, args) {
    var array = new Array(Meta.sizeof(name));
    var template = Meta.getTemplate(name);
    if (!template) {
        throw new Error("No template for " + name + " available");
    }
    template.forEach(function(layout) {
        array[layout.offset] = layout.vtable;
    });
    var ptr = Ptr.Ptr(array, 0, name);
    var ctor = Meta.getGlobal(ptr.type, name);
    if (ctor) {
        args.unshift(ptr);
        ctor.apply(undefined, args);
    }
    return ptr;
}

/**
 * Performs a cast from one pointer type to another.
 *
 * You might think naively that a cast is always a no-op (in our API,
 * you'd just update the type associated with the pointer), but in C++,
 * multiple inheritance could mean that a cast adjusts the actual
 * pointer offset.
 */
Ptr.prototype.cast = function(ty_to) {
    if (ty_to in Meta.getCasts(this.type)) {
        return this.add(Meta.getCast(this.type, ty_to), ty_to);
    }
    var parents = Meta.getParents(this.type);
    for (var i = 0; i < parents.length; i++) {
        var r = this.cast(parents[i]).cast(ty_to);
        if (r) return r;
    }
    return false;
}

/**
 * In C++, the compiler will automatically figures out where identifiers
 * come from; e.g. if you access b->a, where b is class B which inherits
 * from A which defines field a, then the compiler will know it's A::a
 * you're referring to.  We don't have any step which does that in this
 * implementation, so we simulate it using an autocast function, which
 * takes a pointer and a member you're trying to look up, and casts
 * it to the version of the class which actually has the member.
 * Returns 'false' if we couldn't figure out a cast that works.
 *
 * This works for both virtual functions and data members.  This
 * function does NOT do unsafe downcasts!
 *
 * TODO: make it work for static functions too.
 */
Ptr.prototype.autocast = function(member) {
    if (Meta.hasDataOffset(this.type, member)) {
        return this;
    }
    if (member in Meta.getVirtualOffsets(this.type)) {
        return this;
    }
    if (Meta.hasGlobal(this.type, member)) {
        return this;
    }
    var parents = Meta.getParents(this.type);
    for (var i = 0; i < parents.length; i++) {
        var r = this.cast(parents[i]).autocast(member);
        if (r) return r;
    }
    return false;
}
