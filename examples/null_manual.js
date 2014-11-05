var Meta = require('../lib/metadata')
var Layout = require('../lib/layout')

// Calls to Meta API here (there should be NINE setXXX() calls)
// {{{
// ANSWER HERE
    Meta.setCasts("Widget", {});
    Meta.setParents("Widget", []);
    Meta.setDataOffset("Widget::b", 1);
    Meta.setSizeof("Widget", 2);
    Meta.setGlobal("Widget", "Widget", impl_Widget_Widget);
    Meta.setGlobal("Widget", "output1", impl_Widget_output1);
    Meta.setGlobal("Widget", "output2", impl_Widget_output2);
    Meta.setVirtualOffsets("Widget", {"outputV": 0});
    var vtable = [ Layout.VEntry(impl_Widget_outputV, "Widget", 0)];
    Meta.setTemplate("Widget", [Layout.Layout(0, "Widget", vtable)]);
// }}}

// What is the result when we run main, and why?
// {{{
// ANSWER HERE
// The result is: Virtual fn: b=2
// Since we created a real instance of Widget, and invocation to outputV
// runs the virtual function outputV
// }}}

// What is the result when we run main_outputV, and why?
// {{{
// ANSWER HERE
// The result is: Error: Null pointer dereference
// 
// }}}

// What is the result when we run main_output1, and why?
// {{{
// ANSWER HERE
// The result is: Non-virtual fn
// 
// }}}

// What is the result when we run main_output2, and why?
// {{{
// ANSWER HERE
// The result is: Error: Null pointer dereference
// 
// }}}

// You can refer to these functions in your metadata API calls.
function impl_Widget_outputV (thiz) {
    console.log("Virtual fn: b=" + thiz.getMember("b"));
}
function impl_Widget_output1 (thiz) {
    console.log("Non-virtual fn");
}
function impl_Widget_output2 (thiz) {
    console.log("Non-virtual fn: b=" + thiz.getMember("b"));
}
function impl_Widget_Widget (thiz, b) {
    thiz.setMember("b", b);
}
