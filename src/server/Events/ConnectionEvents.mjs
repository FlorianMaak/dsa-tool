import Socket from 'socket.io';
import Event from './Event';

/**
 * @description Handles basic (dis-)connection events
 */
export default class ConnectionEvents extends Event {
    constructor() {
        super();

        console.log('ConnectionEvents loaded!');
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
     */
    test(socket) {
        socket.emit('test', 'Test passed!');
    }


    /**
     * @description Just a dummy event to test functionality.
     * @param {Socket} socket Holds users websocket-connection.
     * @param {Object} data Holds the requests data.
     */
    async getDummyUserTest(socket, data) {
        let testUser = await this.repositories.UserRepository.getById(data._id);

        socket.emit('getDummyUserTest', testUser.username);
    }


    /**
     * @description Handles disconnection jobs
     */
    disconnect() {

    }
}

