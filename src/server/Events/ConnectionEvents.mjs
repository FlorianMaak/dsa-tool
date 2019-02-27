import Socket from 'socket.io';

/**
 * Handles basic (dis-)connection events
 */
export default class ConnectionEvents {
    constructor() {
        console.log('ConnectionEvents loaded!');
    }


    /**
     * @description Just a dummy event to test functionality.
     * @param {Socket} socket Holds users websocket-connection.
     */
    test(socket) {
        socket.emit('test', 'Test passed!');
    }


    /**
     * @description Handles disconnection jobs
     */
    disconnect() {

    }
}

