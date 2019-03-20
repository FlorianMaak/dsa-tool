import User from '../Model/User';
import Repository from './Repository';
import util from 'util';

/**
 * @description Provides database access for user objects
 */
export default class UserRepository extends Repository {
    constructor(mongoConnection) {
        super(mongoConnection);

        this.collection = 'user';
    }


    /**
     * @description Create user object and assign repository.
     * @param {Object} data Data to be written into class.
     * @returns {User} The users object.
     */
    createUserObject(data) {
        let user = null;

        if (data) {
            user = new User();

            delete data.password;
            user = util._extend(user, data);
        }

        return user;
    }


    /**
     * @description Returns a user based on its name.
     * @param {string} userData The users name.
     * @returns {Promise} Returns object.
     */
    async getUser(userData) {
        let data = await this.getCollectionObject().findOne(userData);

        return this.createUserObject(data);
    }
}
