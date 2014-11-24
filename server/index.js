'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/../web-client/'));

var rsa = require('./rsa');
rsa.init(32);

var BigNumber = require('bignumber.js');
var _ = require('underscore');

io.on('connection', function (socket) {
    socket.on('handshake', function (data) {
        socket.rsa = {};
        socket.rsa.e = BigNumber(data.e);
        socket.rsa.m = BigNumber(data.m);
        socket.username = data.username;
        socket.emit('handshake', {e: rsa.e.toString(), m: rsa.m.toString()});
    });
    socket.on('chat-message', function (data) {
        data = rsa.decrypt(data);
        _.each(io.sockets.sockets, function (nextSocket) {
            if (socket.id == nextSocket.id) return;
            var encyptedData = rsa.encrypt(data, nextSocket.rsa.e, nextSocket.rsa.m);
            nextSocket.emit('chat-message', { username: socket.username, text: encyptedData });
        });
    });
});

server.listen(3333, function () {
    console.log('Listening on *:3333');
});