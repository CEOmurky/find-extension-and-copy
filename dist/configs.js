"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importStar(require("fs"));
var Config = /** @class */ (function () {
    function Config() {
        this.root = process.cwd();
        var feacConfig = this.parseConfig();
        this.targetDir = feacConfig.targetDir;
        this.extensions = feacConfig.extensions;
        this.dist = feacConfig.dist;
        this.replaceFolder = feacConfig.replaceFolder;
        this.ignore = feacConfig.ignore;
    }
    Config.prototype.parseConfig = function () {
        var packageJson = JSON.parse(fs_1.default.readFileSync(this.root + '/package.json', 'utf-8'));
        var feacConfig;
        if (packageJson['feac'])
            feacConfig = packageJson['feac'];
        if (fs_1.default.existsSync(this.root + '/feac.json'))
            feacConfig = JSON.parse(fs_1.readFileSync(this.root + '/feac.json', 'utf8'));
        if (fs_1.default.existsSync(this.root + '/configs/feac.json'))
            feacConfig = JSON.parse(fs_1.default.readFileSync(this.root + '/configs/feac.json', 'utf8'));
        if (process.argv.length > 5)
            return this.parseConfigFromArgv();
        if (!feacConfig)
            throw new Error('config not found');
        if (!feacConfig.targetDir)
            throw new Error('targetDir not found');
        if (!feacConfig.dist)
            throw new Error('dist not found');
        if (!feacConfig.extensions || (feacConfig.extensions || []).length === 0)
            throw new Error('extensions not found');
        return {
            targetDir: feacConfig.targetDir,
            dist: feacConfig.dist,
            extensions: feacConfig.extensions,
            replaceFolder: feacConfig.replaceFolder,
            ignore: feacConfig.ignore
        };
    };
    Config.prototype.parseConfigFromArgv = function () {
        var presets = ['targetDir', 'extensions', 'dist', 'replaceFolder'];
        var result = {};
        process.argv.slice(2, process.argv.length).forEach(function (arg) {
            var key = arg.slice(0, arg.indexOf('='));
            var value = arg.slice(arg.indexOf('=') + 1, arg.length);
            if (presets.findIndex(function (preset) { return preset === key; }) === -1)
                throw new Error('unspecified key = ' + key);
            if (key === PresetTypes.ReplaceFolder)
                value = JSON.parse(value);
            if (key === PresetTypes.Extensions || key === PresetTypes.Ignore)
                value = value.toString().replace(/\[|\]/g, '').split(',');
            result[key] = value;
        });
        if (Object.keys(result).length < presets.length)
            throw new Error('config not found');
        return {
            targetDir: result.targetDir,
            extensions: result.extensions,
            dist: result.dist,
            replaceFolder: result.replaceFolder,
            ignore: result.ignore
        };
    };
    return Config;
}());
exports.Config = Config;
var PresetTypes;
(function (PresetTypes) {
    PresetTypes["TargetDir"] = "targetDir";
    PresetTypes["Extensions"] = "extensions";
    PresetTypes["Dist"] = "dist";
    PresetTypes["ReplaceFolder"] = "replaceFolder";
    PresetTypes["Ignore"] = "ignore";
})(PresetTypes || (PresetTypes = {}));
