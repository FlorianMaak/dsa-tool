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
     */
    async getDummyUserTest(socket) {
        let testUser = await this.repositories.UserRepository.getById('5c9150123acd552e74430cdf');

        socket.emit('getDummyUserTest', testUser.username);
    }


    /**
     * @description Handles disconnection jobs
     */
    disconnect() {

    }
}

