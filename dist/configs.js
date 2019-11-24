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
        if (!feacConfig)
            throw new Error('config not found');
        return {
            targetDir: feacConfig.targetDir,
            dist: feacConfig.dist,
            extensions: feacConfig.extensions,
            replaceFolder: feacConfig.replaceFolder
        };
    };
    return Config;
}());
exports.Config = Config;
