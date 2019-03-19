export default class Event {
    constructor() {
        this.repositories = {};
    }


    addRepository(repository) {
        this.repositories[repository.constructor.name] = repository;
    }


    getRepository(repositoryName) {
        return this.repositories[repositoryName];
    }
}
