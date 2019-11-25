import fs from 'fs';
import path from 'path';
import { Config } from './configs';

export class Finder {
	config: Config;
	constructor(config: Config) {
		this.config = config;
	}

	run(): void {
		this.readFileDir(this.config.targetDir);
	}

	readFileDir(dir: string): void {
		const cpDir = this.config.replaceFolder ? dir.substring(this.config.targetDir.length, dir.length) : '';
		const cpRootDir = this.config.root + '/' + this.config.dist + cpDir;
		if (this.config.ignore && this.config.ignore.some((ignore) => cpDir.indexOf(ignore) !== -1)) return;
		fs.readdir(dir, (err, files) => {
			if (err) throw new Error('dir not found : ' + dir);
			files.forEach((file) => {
				const isSome: boolean = this.config.extensions.some((extension) => extension === path.extname(file));
				if (!fs.existsSync(cpRootDir)) fs.mkdirSync(cpRootDir);
				if (isSome) fs.copyFileSync(dir + '/' + file, cpRootDir + '/' + file);
				if (fs.statSync(path.resolve(dir, file)).isDirectory()) this.readFileDir(dir + '/' + file);
			});
		});
	}
}
