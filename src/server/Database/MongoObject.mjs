import util from 'util';

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


    /**
     * @description Generates copy of object and removes its id.
     * @returns {Object} Returns clean copy of object.
     */
    toPublic() {
        let copy = util._extend({}, this);
        delete copy._id;

        return copy;
    }
}
