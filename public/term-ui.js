// init
function init() {
    const term = new Terminal({ cursorBlink: true })
    Terminal.applyAddon(fit);
    term.open(document.getElementById('terminal-container'))
    term.write('\x1B[1;3;31mcontainer-with-xterm\x1B[0m $ ')
    term.fit()

    var socket = io.connect();
    socket.on('connect', function () {
        term.write('\r\n[Connected]\r\n')

        term.on('data', function (data) {
            socket.emit('data', data)
        })

        socket.on('data', function (data) {
            term.write(data)
        })

        socket.on('disconnect', function () {
            term.write('\r\n[Disconnected]\r\n')
        })
    })
}

window.addEventListener('load', function () {
    init()
})