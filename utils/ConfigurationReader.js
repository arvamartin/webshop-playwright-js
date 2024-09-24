import fs from 'fs'
import path from 'path';

class ConfigurationReader {
  constructor() {
    const configPath = path.resolve(process.cwd(), 'resources/config.json');
    try {
      const fileContent = fs.readFileSync(configPath, 'utf-8');
      this.properties = JSON.parse(fileContent); 
    } catch (err) {
      console.error('Failed to load configuration:', err);
      this.properties = {};
    }
  }

  getProperty(key) {
    return this.properties[key];
  }
}

const configReader = new ConfigurationReader();
export default configReader; 