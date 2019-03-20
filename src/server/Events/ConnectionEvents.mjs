import Socket from 'socket.io';
import Event from './Event';

/**
 * @description Handles basic (dis-)connection events
 */
export default class ConnectionEvents extends Event {
    constructor() {
        super();
    }


    /**
     * @description Just a dummy event to test functionality.
     * @param {Socket} socket Holds users websocket-connection.
     */
    ping(socket) {
        socket.emit('ping', 'Pong!');
    }


    /**
     * @description Handles disconnection jobs
     */
    disconnect() {

    }
}

