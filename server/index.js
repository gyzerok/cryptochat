'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

global.Bacon = require('baconjs').Bacon;

var BigNumber = require('bignumber.js');
var _ = require('lodash');

app.use(express.static(__dirname + '/../web-client/'));

var rsa = require('./rsa');
rsa.init(32);

var conns = Bacon.fromBinder(function (sink) {
    io.on('connection', sink);
});

var handshakes = conns.flatMap(function (socket) {
    return Bacon.fromBinder(function (sink) {
        socket.on('handshake', function (data) {
            sink({ socket: socket, data: data });
        });
    })
});

handshakes.onValue(function (e) {
    e.socket.rsa = {};
    e.socket.rsa.e = BigNumber(e.data.e);
    e.socket.rsa.m = BigNumber(e.data.m);
    e.socket.username = e.data.username;
    e.socket.emit('handshake', {e: rsa.e.toString(), m: rsa.m.toString()});
});

var messages = conns.flatMap(function (socket) {
    return Bacon.fromBinder(function (sink) {
        socket.on('chat-message', function (encoded) {
            sink({ author: socket, text: encoded });
        });
    });
});

var decrypted = messages.map(function (message) {
    return { author: message.author, text: rsa.decrypt(message.text) }
});

decrypted.onValue(function (message) {
    _.each(io.sockets.sockets, function (socket) {
        if (message.author.id == socket.id) return;
        var encyptedData = rsa.encrypt(message.text, socket.rsa.e, socket.rsa.m);
        socket.emit('chat-message', { username: message.author.username, text: encyptedData });
    });
});

server.listen(1337, function () {
    console.log('Listening on *:1337');
});