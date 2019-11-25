import fs, { readFileSync } from 'fs';

export class Config {
	readonly root: string;
	targetDir: string;
	extensions: string[];
	dist: string;
	replaceFolder: boolean;
	ignore: string[];

	constructor() {
		this.root = process.cwd();

		const feacConfig: ConfigJson = this.parseConfig();
		this.targetDir = feacConfig.targetDir;
		this.extensions = feacConfig.extensions;
		this.dist = feacConfig.dist;
		this.replaceFolder = feacConfig.replaceFolder;
		this.ignore = feacConfig.ignore;
	}

	public parseConfig(): ConfigJson {
		const packageJson = JSON.parse(fs.readFileSync(this.root + '/package.json', 'utf-8'));
		let feacConfig;
		if (packageJson['feac']) feacConfig = packageJson['feac'];
		if (fs.existsSync(this.root + '/feac.json'))
			feacConfig = JSON.parse(readFileSync(this.root + '/feac.json', 'utf8'));
		if (fs.existsSync(this.root + '/configs/feac.json'))
			feacConfig = JSON.parse(fs.readFileSync(this.root + '/configs/feac.json', 'utf8'));

		if (process.argv.length > 5) return this.parseConfigFromArgv();

		if (!feacConfig) throw new Error('config not found');

		if (!feacConfig.targetDir) throw new Error('targetDir not found');

		if (!feacConfig.dist) throw new Error('dist not found');

		if (!feacConfig.extensions || (feacConfig.extensions || []).length === 0)
			throw new Error('extensions not found');

		return {
			targetDir: feacConfig.targetDir,
			dist: feacConfig.dist,
			extensions: feacConfig.extensions,
			replaceFolder: feacConfig.replaceFolder,
			ignore: feacConfig.ignore
		};
	}

	public parseConfigFromArgv(): ConfigJson {
		const presets = [ 'targetDir', 'extensions', 'dist', 'replaceFolder', 'ignore' ];
		let result: {
			[key: string]: string | string[] | boolean;
		} = {};
		process.argv.slice(2, process.argv.length).forEach((arg) => {
			const key = arg.slice(0, arg.indexOf('='));
			let value: string | string[] | boolean = arg.slice(arg.indexOf('=') + 1, arg.length);

			if (presets.findIndex((preset: string) => preset === key) === -1)
				throw new Error('unspecified key = ' + key);

			if (key === PresetTypes.ReplaceFolder) value = JSON.parse(value);

			if (key === PresetTypes.Extensions || key === PresetTypes.Ignore)
				value = value.toString().replace(/\[|\]/g, '').split(',');
			result[key] = value;
		});

		if (Object.keys(result).length < presets.length) throw new Error('config not found');

		return {
			targetDir: result.targetDir as string,
			extensions: result.extensions as string[],
			dist: result.dist as string,
			replaceFolder: result.replaceFolder as boolean,
			ignore: result.ignore as string[]
		};
	}
}

enum PresetTypes {
	TargetDir = 'targetDir',
	Extensions = 'extensions',
	Dist = 'dist',
	ReplaceFolder = 'replaceFolder',
	Ignore = 'ignore'
}

interface ConfigJson {
	targetDir: string;
	extensions: string[];
	dist: string;
	replaceFolder: boolean;
	ignore: string[];
}
