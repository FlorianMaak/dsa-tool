export default class MongoObject {
    constructor() {
        this.mongoId = null;
        this.repository = null;
    }


    /**
     * @description Stores object to database.
     */
    save() {
        this.repository.save(this);
    }


    /**
     * @description Deletes object from database.
     */
    delete() {
        this.repository.delete(this);
    }


    /**
     * @description Returns the objects id.
     * @returns {string} The ressources MongoID.
     */
    getId() {
        return this.mongoId;
    }


    /**
     * @description Set the objects repository name.
     * @param {Object} repository Represents the reporitorys name.
     */
    setRepository(repository) {
        this.repository = repository;
    }
}
