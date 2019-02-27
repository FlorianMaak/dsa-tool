const SIOClient = require('socket.io-client');
let wsClient = undefined;
let data = {};

describe('Websocket server tests', function () {
    before(function (done) {
        wsClient = SIOClient('http://localhost:8080/');
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
        wsClient.on('test', res => {
            console.log(res);

            done();
        });

        wsClient.emit('test');
    });
});
