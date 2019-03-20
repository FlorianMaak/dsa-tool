import User from '../Model/User';
import Repository from './Repository';

/**
 * @description Provides database access for user objects
 */
export default class UserRepository extends Repository {
    constructor(mongoConnection) {
        super(mongoConnection);

        this.collection = 'user';
    }


    /**
     * @description Returns a user based on its name.
     * @param {string} userData The users name.
     * @returns {Promise} Returns object.
     */
    async getUser(userData) {
        let data = await this.getCollectionObject().findOne(userData);

        return this.mapObject(new User(), data);
    }
}
