import Express from 'express';
import IO from 'socket.io';
import http from 'http';

/**
 * @description Handles websocket-connections
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
        let config = {};
        this.express = new Express();
        this.http = http.Server(this.express);
        this.express.disable('x-powered-by');

        // Set security headers if needed
        if (process.env.SET_SECURITY_HEADERS === 'true') {
            config.setHeaders = function (res) {
                res.set('X-Frame-Options', 'sameorigin');
                res.set('X-XSS-Protection', '1; mode=block');
                res.set('X-Content-Type-Options', 'nosniff');
            };
        }

        // Start webserver and serve dist-folder
        this.express.use(Express.static('dist', config));
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
            socket.emit('connection');

            for (let event of Object.keys(this.events)) {
                socket.on(event, data => {
                    this.eventClasses[this.events[event].class][this.events[event].method](socket, data);
                });
            }
        });

        console.log('Started websocket server');
    }
}
