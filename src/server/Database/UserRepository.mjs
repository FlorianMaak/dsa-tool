import User from '../Model/User';
import Repository from './Repository';
import TextHelper from '../Helper/TextHelper';

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


    async createUser(username, password) {
        let user = await this.getUser({username: username});

        if (!user) {
            let newUser = await this.getCollectionObject().insertOne({
                username: username,
                password: await TextHelper.hashPassword(password),
                created: Date.now()
            });

            return this.mapObject(new User(), newUser.ops[0]);
        }

        return false;
    }
}
