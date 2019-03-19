import fs from 'fs';
import RequestHandler from './RequestHandler.mjs';
import dotenv from 'dotenv';
import MongoDB from 'mongodb';

/**
 * @description Handles core functions and server startup
 */
export default class Server {
    constructor() {
        dotenv.load();
        this.requestHandler = {};
        this.eventClasses = {};
        this.repositories = {};
        this.serverPath = `${process.cwd()}/src/server`;

        this.startup().then(() => {
            console.log('Server star-up complete!');
        });
    }


    /**
     * @description Starts the server
     */
    async startup() {
        this.mongoConnection = await this.establishMongoConnection();

        this.loadModules().then(msg => {
            console.log(msg);

            this.requestHandler = new RequestHandler(this.events, this.eventClasses);
        });
    }


    /**
     * @description Connect to MongoDB.
     * @returns {MongoDB.connect} Returns open MongoDB connection.
     */
    async establishMongoConnection() {
        return await MongoDB.MongoClient.connect(process.env.MONGO_DB);
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
            const className = this.events[eventName].class;

            if (!this.eventClasses[className]) {
                const module = await this.importModule(className);
                this.eventClasses[className] = new module.default();

                for (let repository of this.eventClasses[className].getRepositories()) {
                    if (!this.eventClasses[className].repositories[repository]) {
                        this.eventClasses[className].addRepository(await this.getRepository(repository));
                    }
                }
            }
        }

        return `Loaded ${Object.keys(this.eventClasses).length} modules`;
    }


    /**
     * @description Loads repositories and stores them in memory.
     * @param {string} repositoryName Represents the repositorys className.
     * @returns {Promise<*>} Returns Promise containing repository.
     */
    async getRepository(repositoryName) {
        if (!this.repositories[repositoryName]) {
            await this.importModule(repositoryName, 'Database').then(repository => {
                this.repositories[repositoryName] = new repository.default(this.mongoConnection);
            });
        }

        return this.repositories[repositoryName];
    }


    /**
     * @description Import EventClass-Module, based on it's name.
     * @param {string} className The EventClass to be loaded from Events-Folder.
     * @param {string} path Path to class file.
     * @returns {Promise<*>} Returns promise, if import finished.
     */
    async importModule(className, path = 'Events') {
        return await import(`file://${this.serverPath}/${path}/${className}.mjs`);
    }
}
