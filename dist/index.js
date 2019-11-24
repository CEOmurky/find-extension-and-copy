"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var finder_1 = require("./finder");
var configs_1 = require("./configs");
try {
    var config = new configs_1.Config();
    var finder = new finder_1.Finder(config);
    finder.run();
}
catch (error) {
    console.error(error);
}
// const finder = new Finder();
// finder.run();
