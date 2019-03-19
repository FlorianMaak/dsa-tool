import User from '../Model/User';
import Repository from './Repository';

export default class UserRepository extends Repository {
    constructor(mongoConnection) {
        super(mongoConnection);

        this.collection = 'user';
    }


    /**
     * @description Create user object and assign repository.
     * @returns {User} The users object.
     */
    createUserObject() {
        let user = new User();
        user.setRepository(this);

        return user;
    }
}
