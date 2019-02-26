import Express from 'express';
import IO from 'socket.io';
import http from 'http';

/**
 * Handles websocket-connections
 */
export default class RequestHandler {
    /**
     * @description Handles websocket events and connections.
     * @param {Object} events Holds the event-to-method map.
     * @param {Object} eventClasses Holds EventClasses for each event.
     */
    constructor(events, eventClasses) {
        this.events = events;
        this.eventClasses = eventClasses;

        this.startWebserver();
        this.startWebsocketServer();
    }


    /**
     * @description Starts serving the webapp.
     */
    startWebserver() {
        this.express = new Express();
        this.http = http.Server(this.express);

        // Start webserver and serve dist-folder
        this.express.use(Express.static('dist'));
        this.http.listen(process.env.PORT);

        console.log('Webapp running on port: ', process.env.PORT);
    }


    /**
     * @description Starts listening for websocket-connections and handles events
     */
    startWebsocketServer() {
        this.io = new IO(this.http);

        // Add eventlisteners
        this.io.on('connection', socket => {
            for (let event of Object.keys(this.events)) {
                socket.on(event, () => {
                    this.eventClasses[this.events[event].class][this.events[event].method](socket);
                    console.log(`triggered event ${event}`);
                });
            }
        });

        console.log('Listening for websocket-connections');
    }
}
