const SIOClient = require('socket.io-client');
const dotenv = require('dotenv');
let wsClient = undefined;
let username = 'Test-User-' + Date.now();

describe('User Tests', function () {
    before(function (done) {
        dotenv.config();
        wsClient = SIOClient(`http://localhost:${process.env.PORT}/`);
        done();
    });

    after(function (done) {
        done();
    });

    it('should register a new user', done => {
        wsClient.on('register', state => {
            state === true ? done() : done(state);
        });

        wsClient.emit('register', {username: username, password: '123456'});
    });

    it('should login as new user', done => {
        wsClient.on('login', user => {
            user ? done() : done('Login failed!');
        });

        wsClient.emit('login', {username: username, password: '123456'});
    });

    it('should get user by name', done => {
        wsClient.on('getUser', user => {
            user ? done() : done('No user returned!');
        });

        wsClient.emit('getUser', {username: username});
    });

    it('should logout user', done => {
        wsClient.on('logout', () => {
            done();
        });

        wsClient.emit('logout');
    });
});
