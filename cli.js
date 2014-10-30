#!/usr/bin/env nodejs

function usage() {
  var s = "\
Usage: \n\
    nodejs cli.js EXAMPLE\n\
    e.g. nodejs cli.js point\n\
         nodejs cli.js multiple\n"
  process.stderr.write(s);
  process.exit(1);
}

if (process.argv.length != 3) {
  usage();
}

var main = require('./examples/' + process.argv[2]);

var compile = require('./lib/compiler');
compile();

// Meta.dump();

main();
