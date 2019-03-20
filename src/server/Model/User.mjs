import MongoObject from '../Database/MongoObject';

/**
 * @desciption Represents a user.
 */
export default class User extends MongoObject {
    constructor() {
        super();

        this.username = '';
        this.created = null;
    }
}
