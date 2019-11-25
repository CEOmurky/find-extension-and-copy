"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Finder = /** @class */ (function () {
    function Finder(config) {
        this.config = config;
    }
    Finder.prototype.run = function () {
        this.readFileDir(this.config.targetDir);
    };
    Finder.prototype.readFileDir = function (dir) {
        var _this = this;
        var cpDir = this.config.replaceFolder ? dir.substring(this.config.targetDir.length, dir.length) : '';
        var cpRootDir = this.config.root + '/' + this.config.dist + cpDir;
        if (this.config.ignore && this.config.ignore.some(function (ignore) { return cpDir.indexOf(ignore) !== -1; }))
            return;
        fs_1.default.readdir(dir, function (err, files) {
            if (err)
                throw new Error('dir not found : ' + dir);
            files.forEach(function (file) {
                var isSome = _this.config.extensions.some(function (extension) { return extension === path_1.default.extname(file); });
                if (!fs_1.default.existsSync(cpRootDir))
                    fs_1.default.mkdirSync(cpRootDir);
                if (isSome)
                    fs_1.default.copyFileSync(dir + '/' + file, cpRootDir + '/' + file);
                if (fs_1.default.statSync(path_1.default.resolve(dir, file)).isDirectory())
                    _this.readFileDir(dir + '/' + file);
            });
        });
    };
    return Finder;
}());
exports.Finder = Finder;
