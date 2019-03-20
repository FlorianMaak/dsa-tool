/**
 * @desciption Class to be extended to provide basic event functionallity
 */
export default class Event {
    constructor() {
        this.repositories = {};
    }


    /**
     * @description Add repository to event.
     * @param {string} repository The repositorys name.
     */
    addRepository(repository) {
        this.repositories[repository.constructor.name] = repository;
    }


    /**
     * @description Returns repository by name.
     * @param {string} repositoryName The repositorys name.
     * @returns {Object} Repository instance.
     */
    getRepository(repositoryName) {
        return this.repositories[repositoryName];
    }
}
