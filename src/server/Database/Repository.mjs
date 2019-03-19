import MongoDB from 'mongodb';

export default class Repository {
    constructor(mongoConnection) {
        this.connection = mongoConnection;
        this.collection = null;
        this.collectionObject = null;
    }


    save(object) {
        console.log(`Missing implementation! collection: ${this.collection}`);
    }


    delete(object) {
        this.getCollectionObject().deleteOne({_id: new MongoDB.ObjectID(object._id)});
    }


    async getById(mongoID) {
        return await this.getCollectionObject().findOne({_id: MongoDB.ObjectID(mongoID)});
    }


    getCollectionObject() {
        if (!this.collectionObject) {
            this.collectionObject = this.connection.db().collection(this.collection);
        }

        return this.collectionObject;
    }
}
