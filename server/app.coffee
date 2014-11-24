express = require('express')
app = express()

global.app = app

server = require('http').Server(app)
io = require('socket.io').listen(server)

app.use(express.static("#{__dirname}/../web-client/"))

server.listen(1337, () ->
  console.log('Listening on *:1337')
)

module.exports = app
