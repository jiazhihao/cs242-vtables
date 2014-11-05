var Meta = require('../lib/metadata')
var Layout = require('../lib/layout')

// Calls to Meta API here.  We've provided all of the function layout
// for you, so you only need to provide the calls to setCasts,
// setParents, setDataOffset and setSizeof.  You should make FIFTEEN
// calls in total.
// {{{
// ANSWER HERE
Meta.setCasts("A", {});
Meta.setParents("A", []);
Meta.setDataOffset("A::x", 1);
Meta.setSizeof("A", 2);

Meta.setCasts("B", {"A": 0});
Meta.setParents("B", ["A"]);
Meta.setDataOffset("B::y", 2);
Meta.setSizeof("B", 3);

Meta.setCasts("C", {"A": 0});
Meta.setParents("C", ["A"]);
Meta.setDataOffset("C::z", 2);
Meta.setSizeof("C", 3);

Meta.setCasts("D", {"B": 0, "C": 3});
Meta.setParents("D", ["B", "C"]);
Meta.setSizeof("D", 6);
// }}}

Meta.setGlobal("A", "A", impl_A_A);
Meta.setVirtualOffsets("A", {});
Meta.setTemplate("A", [Layout.Layout(0, "A", [])]);

Meta.setGlobal("B", "B", impl_B_B);
Meta.setVirtualOffsets("B", {});
Meta.setTemplate("B", [Layout.Layout(0, "B", [])]);

Meta.setGlobal("C", "C", impl_C_C);
Meta.setVirtualOffsets("C", {});
Meta.setTemplate("C", [Layout.Layout(0, "C", [])]);

Meta.setGlobal("D", "D", impl_D_D);
Meta.setVirtualOffsets("D", {});
Meta.setTemplate("D", [Layout.Layout(0, "D", []), Layout.Layout(3, "C", [])]);

function impl_A_A(thiz, x) {
    thiz.setMember("x", x);
}

function impl_B_B(thiz, x, y) {
    thiz.setMember("x", x);
    thiz.setMember("y", y);
}

function impl_C_C(thiz, x, z) {
    thiz.setMember("x", x);
    thiz.setMember("z", z);
}

function impl_D_D(thiz, x, y, z) {
    thiz.call("B", [x, y]);
    thiz.call("C", [x, z]);
}
