'use strict';

var app = {
    username: undefined,
    content: $('#content'),
    socket: undefined,
    rsa: undefined,

    start: function (username) {
        app.username = username;
        app.rsa = rsa;
        app.rsa.init(32);

        app.socket = io();
        $('form').submit(app.onSendMessage);

        app.socket.on('connect', function () {
            app.socket.emit('handshake', { username: app.username, e: rsa.e.toString(), m: rsa.m.toString() });
        });

        app.socket.on('handshake', function (data) {
            app.socket.rsa = {};
            app.socket.rsa.e = BigNumber(data.e);
            app.socket.rsa.m = BigNumber(data.m);
        });

        app.socket.on('chat-message', app.onMessageReceived);
    },

    onMessageReceived: function (data) {
        var username = data.username;
        data = app.rsa.decrypt(data.text);
        $('#messages').append($('<li>').html('<strong>' + username + ':</strong> ' + data));
    },

    onSendMessage: function () {
        var data = $('#m').val();
        $('#messages').append($('<li>').html('<strong style="color: #5661F0">' + app.username + ':</strong> ' + data));
        data = app.rsa.encrypt(data, app.socket.rsa.e, app.socket.rsa.m);
        app.socket.emit('chat-message', data);
        $('#m').val('');
        return false;
    }
};