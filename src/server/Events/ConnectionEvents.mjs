import Socket from 'socket.io';

/**
 * Handles basic (dis-)connection events
 */
export default class ConnectionEvents {
    constructor() {
        this.test = 123;
        console.log('ConnectionEvents loaded!');
    }


    /**
     * @description Just a dummy event to test functionality.
     * @param {Socket} socket Holds users websocket-connection.
     */
    test(socket) {
        console.log(this.test, socket);
    }
}

