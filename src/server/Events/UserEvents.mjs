import Socket from 'socket.io';
import Event from './Event';
import TextHelper from '../Helper/TextHelper';

/**
 * @description Handles basic user actions.
 */
export default class UserEvents extends Event {
    constructor() {
        super();
    }


    /**
     * @description Defines the events repositories.
     * @returns {string[]} Array of repository classes.
     */
    getRepositories() {
        return [
            'UserRepository'
        ];
    }


    /**
     * @description Just a dummy event to test functionality.
     * @param {Socket} socket Holds users websocket-connection.
     * @param {Object} data Holds the requests data.
     */
    async getUser(socket, data) {
        let user = await this.repositories.UserRepository.getUser(data);

        socket.emit('getUser', user);
    }


    /**
     * @description Just a dummy event to test functionality.
     * @param {Socket} socket Holds users websocket-connection.
     * @param {Object} data Holds the requests data.
     */
    async register(socket, data) {
        if (!data.username || !data.password) {
            socket.emit('register', 'data_missing');
        }
        else {
            let user = await this.repositories.UserRepository.createUser(data.username, data.password);

            socket.emit('register', user ? true : 'username_already_taken');

            if (user) {
                socket.user = user;
                socket.emit('login', user);
            }
        }
    }


    /**
     * @description Deletes user object from socket and emits logout-event.
     * @param {Socket} socket The users connection.
     */
    logout(socket) {
        delete socket.user;

        socket.emit('logout');
    }


    /**
     * @description Login user and store userobject to socket.
     * @param {Socket} socket Holds the users connection.
     * @param {Object} data UserData provided to login with.
     */
    async loginUser(socket, data) {
        let user = await this.repositories.UserRepository.getUser({
            username: data.username,
            password: await TextHelper.hashPassword(data.password)
        });

        socket.user = user;

        socket.emit('login', user);
    }
}

