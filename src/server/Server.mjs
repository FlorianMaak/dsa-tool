import fs from 'fs';
import RequestHandler from './RequestHandler.mjs';

/**
 * Handles core functions and server startup
 */
export default class Server {
    constructor() {
        this.requestHandler = {};
        this.eventClasses = {};
        this.serverPath = `${process.cwd()}/src/server`;

        this.startup();
    }


    /**
     * @description Starts the server
     */
    startup() {
        this.loadModules().then(msg => {
            const serverConfig = JSON.parse(fs.readFileSync(`${this.serverPath}/config/server.json`));

            console.log(msg);
            this.requestHandler = new RequestHandler(this.events, this.eventClasses, serverConfig);
        });
    }


    /**
     * @description Loads events.json and creates object.
     * @returns {Object} Returns object of events.
     */
    getConfig() {
        if (!this.events) {
            this.events = JSON.parse(fs.readFileSync(`${this.serverPath}/config/events.json`));
        }

        return this.events;
    }


    /**
     * @description Loads Eventclasses, based on events.json-file.
     * @returns {Promise<string>} Success Message.
     */
    async loadModules() {
        this.getConfig();

        for (let eventName of Object.keys(this.events)) {
            if (!this.eventClasses[eventName.class]) {
                const className = this.events[eventName].class;

                if (!this.eventClasses[className]) {
                    const module = await this.importModule(className);

                    this.eventClasses[className] = new module.default();
                }
            }
        }

        return `Loaded ${Object.keys(this.eventClasses).length} modules`;
    }


    /**
     * @description Import EventClass-Module, based on it's name.
     * @param {string} className The EventClass to be loaded from Events-Folder.
     * @returns {Promise<*>} Returns promise, if import finished.
     */
    async importModule(className) {
        return await import(`file://${this.serverPath}/Events/${className}.mjs`);
    }
}
