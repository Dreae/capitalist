import * as fs from 'fs';

const DEFAULT_SETTINGS = {
    apiId: null,
    apiKey: null,
    characters: [],
    spFarms: []
};

export default class Userdata {
    constructor() {
        this.settingsFile = 'data/settings.json';
        this.settings = null;
    }

    async init() {
        return new Promise((resolve) => {
            fs.exists(this.settingsFile, async (exists) => {
                if (!exists) {
                    this.settings = DEFAULT_SETTINGS;
                    await this.saveSettings();
                    
                    resolve();
                } else {
                    await this.readSettings();

                    resolve();
                }
            });
        });
    }

    async readSettings() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.settingsFile, (err, data) => {
                if (err) {
                    reject(err);
                }

                this.settings = JSON.parse(data);
                resolve();
            });
        });
    }

    async saveSettings() {
        return new Promise((resolve, reject) => {
            fs.open(this.settingsFile, 'w+', (err, file) => {
                if (err) {
                    reject(err);
                }

                fs.write(file, JSON.stringify(this.settings), (err) => {
                    if (err) {
                        reject(err);
                    }
                    
                    fs.close(file, (err) => {
                        if (err) {
                            reject(err);
                        }

                        resolve();
                    });
                });
            });
        });
    }
}