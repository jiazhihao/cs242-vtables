var Meta = require('../lib/metadata')
var Layout = require('../lib/layout')

// Calls to Meta API here (there should be NINE setXXX() calls)
// {{{
// ANSWER HERE
// }}}

// What is the result when we run main, and why?
// {{{
// ANSWER HERE
// }}}

// What is the result when we run main_outputV, and why?
// {{{
// ANSWER HERE
// }}}

// What is the result when we run main_output1, and why?
// {{{
// ANSWER HERE
// }}}

// What is the result when we run main_output2, and why?
// {{{
// ANSWER HERE
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
