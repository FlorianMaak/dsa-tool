const SIOClient = require('socket.io-client');
const dotenv = require('dotenv');
let wsClient = undefined;

describe('User Tests', function () {
    before(function (done) {
        dotenv.config();
        wsClient = SIOClient(`http://localhost:${process.env.PORT}/`);
        done();
    });

    after(function (done) {
        done();
    });

    it('should get user by name', done => {
        wsClient.on('getUser', user => {
            user ? done() : done('No user returned!');
        });

        wsClient.emit('getUser', {username: 'Test-User'});
    });

    it('should pass login', done => {
        wsClient.on('login', user => {
            user ? done() : done('Login failed!');
        });

        wsClient.emit('login', {username: 'Test-User', password: '123456'});
    });
});
