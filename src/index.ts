import { Finder } from "./finder";
import { Config } from "./configs";

try {
    const config = new Config();
    const finder = new Finder(config);

    finder.run();
} catch (error) {
    console.error(error);    
}
// const finder = new Finder();
// finder.run();