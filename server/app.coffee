express = require('express')
app = express()

global.app = app

server = require('http').Server(app)
io = require('socket.io').listen(server)

global.Bacon = require('baconjs').Bacon

app.use(express.static("#{__dirname}/../web-client/"))

connections = Bacon.fromBinder (sink) ->
  io.on('connection', sink)

messages = connections.flatMap (socket) ->
  Bacon.fromBinder (sink) ->
    socket.on('chat-message', (msg) ->
      sink
        author: socket
        msg: msg
    )

messages.onValue (val) ->
  console.log(val.msg)

module.exports = server
