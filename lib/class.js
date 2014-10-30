var adt = require('adt'), data = adt.data, only = adt.only;

var Class = data(function () {
    return {
        Class : {
            name : only(String),
            data : adt.any, // only(Array),         // of String
            virtual : adt.any, // only(Array),      // of Method
            nonvirtual : adt.any, // only(Array),   // of Method
            inherits : adt.any, // only(Array)      // of String
        }
    };
});

module.exports = Class
