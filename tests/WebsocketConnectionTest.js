const SIOClient = require('socket.io-client');
const dotenv = require('dotenv');
let wsClient = undefined;
let data = {};

describe('Websocket server tests', function () {
    before(function (done) {
        dotenv.load();
        wsClient = SIOClient(`http://localhost:${process.env.PORT}/`);
        done();
    });

    after(function (done) {
        done();
    });

    it('should be online', done => wsClient.on('connection', res => {
        data.connectionData = res;

        done();
    }));

    it('should react on test-event', done => {
        wsClient.on('test', () => {
            done();
        });

        wsClient.emit('test');
    });
});
