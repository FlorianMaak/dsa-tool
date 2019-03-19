import MongoDB from 'mongodb';

export default class Repository {
    constructor(mongoConnection) {
        this.connection = mongoConnection;
        this.collection = null;
        this.collectionObject = null;
    }


    /**
     * @description Stores object to database.
     */
    save() {
        console.log(`Missing implementation! collection: ${this.collection}`);
    }


    /**
     * @description Deletes object from database.
     * @param {Object} object Object to be deleted.
     */
    delete(object) {
        this.getCollectionObject().deleteOne({_id: new MongoDB.ObjectID(object._id)});
    }


    /**
     * @description Returns object by mongoID
     * @param {string} mongoID The objects mongoID.
     * @returns {Promise} Returns object.
     */
    async getById(mongoID) {
        return await this.getCollectionObject().findOne({_id: MongoDB.ObjectID(mongoID)});
    }


    /**
     * @description Returns instance of collection.
     * @returns {Object} The collections instance.
     */
    getCollectionObject() {
        if (!this.collectionObject) {
            this.collectionObject = this.connection.db().collection(this.collection);
        }

        return this.collectionObject;
    }
}
