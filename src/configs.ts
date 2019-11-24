import fs, { readFileSync } from 'fs';

export class Config {
	readonly root:string;
	targetDir: string;
	extensions: string[];
	dist: string;
	replaceFolder: boolean;

	constructor() {
		this.root = process.cwd();

		const feacConfig: ConfigJson = this.parseConfig();
		this.targetDir = feacConfig.targetDir;
		this.extensions = feacConfig.extensions;
		this.dist = feacConfig.dist;
		this.replaceFolder = feacConfig.replaceFolder;
	}


	public parseConfig(): ConfigJson {
		const packageJson = JSON.parse(fs.readFileSync(this.root + '/package.json', 'utf-8'));
		let feacConfig;
		if (packageJson['feac'])
			feacConfig = packageJson['feac'];
		if (fs.existsSync(this.root + '/feac.json'))
			feacConfig = JSON.parse(readFileSync(this.root + '/feac.json', 'utf8'))
		if (fs.existsSync(this.root + '/configs/feac.json'))
			feacConfig = JSON.parse(fs.readFileSync(this.root + '/configs/feac.json', 'utf8'));

		if (!feacConfig) throw new Error('config not found');

		return {
			targetDir: feacConfig.targetDir,
			dist: feacConfig.dist,
			extensions: feacConfig.extensions,
			replaceFolder: feacConfig.replaceFolder
		};
	}
}

interface ConfigJson {
	targetDir: string;
	extensions: string[];
	dist: string;
	replaceFolder: boolean;
}