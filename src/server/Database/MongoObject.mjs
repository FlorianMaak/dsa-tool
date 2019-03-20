/**
 * @description Class to be extended to provide basic mongoDB functionallity.
 */
export default class MongoObject {
    constructor() {
        this._id = null;
    }


    /**
     * @description Returns the objects id.
     * @returns {string} The ressources MongoID.
     */
    getId() {
        return this._id;
    }
}
