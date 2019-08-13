const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
io.listen(http)
const SSHClient = require('ssh2').Client
const config = require('config')

// mount public directory
app.use(express.static('public'))
// mount directories from node_modules
app.use('/xterm_dist', express.static(__dirname + '/node_modules/xterm/dist/'))
app.use('/socket.io-client_dist', express.static(__dirname + '/node_modules/socket.io-client/dist/'))

// use node-config
const connectionConfig = config.get('connection')

// setup socket.io
io.on('connection', function (socket) {
    var conn = new SSHClient()
    conn.on('ready', function () {
        socket.emit('data', '\r\n[CONNECTED]\r\n')
        conn.shell(function (err, stream) {
            if (err)
                return socket.emit('data', '\r\n[ERROR] ' + err.message + '\r\n')
            socket.on('data', function (data) {
                stream.write(data)
            })
            stream.on('data', function (d) {
                socket.emit('data', d.toString('binary'))
            }).on('close', function () {
                conn.end()
            })
        })
    }).on('close', function () {
        socket.emit('data', '\r\n[CLOSED]\r\n')
    }).on('error', function (err) {
        socket.emit('data', '\r\n[ERROR]' + err.message + '\r\n')
    }).connect({
        host: connectionConfig.host,
        port: connectionConfig.port,
        username: connectionConfig.user,
        password: connectionConfig.password
    })
})

const server = http.listen(3000, function () {
    console.log("Node.js is listening to PORT:" + server.address().port)
})
