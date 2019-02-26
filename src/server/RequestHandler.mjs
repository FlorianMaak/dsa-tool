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
     * @param {Object} serverConfig Holds the servers config values.
     */
    constructor(events, eventClasses, serverConfig) {
        this.events = events;
        this.eventClasses = eventClasses;
        this.serverConfig = serverConfig;

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
        if (this.serverConfig.webserver.enabled) {
            this.express.use(Express.static('dist'));
            this.http.listen(this.serverConfig.webserver.port);

            console.log('Webapp running on port: ', this.serverConfig.webserver.port);
        }
    }


    /**
     * @description Starts listening for websocket-connections and handles events
     */
    startWebsocketServer() {
        if (this.serverConfig.websocketserver.enabled) {
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
}
