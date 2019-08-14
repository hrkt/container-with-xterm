# container-with-xterm

## Quick Description

### It does

container-with-xterm runs sshd inside the container and expose shell with ["xterm.js"](https://xtermjs.org).

### It does not

- secure anything
- limit anything

### future work

see [GitHub project](https://github.com/hrkt/container-with-xterm/projects)

## How to run

1. build container

```console
docker build -t container-with-xterm .
```

2. run it

```console
$ docker run -it -p 3000:3000 --rm container-with-xterm 

> container-with-xterm@0.0.1 start /
> NODE_ENV=prod node app.js

Node.js is listening to PORT:3000
```


3. open your brouser http://localhost:3000

![terminal](https://github.com/hrkt/container-with-xterm/blob/master/site/login.png "sample")

4. to stop, press Ctrl-C on the terminal you used in step 2.

## How it works

```text
These components are running in one container.

[Browser with Terminal(xterm.js)] <---WebSocket(socket.io)---> [Server(Express.js with Socket.io)] ---ssh(ssh2.js)---> sshd

```

## prerequisites

- Docker

## usage

### run in dev mode

```console
npm run dev
```

### run in release mode

```console
npm start
```

### build container

```console
docker build -t container-with-xterm .
```

## License

MIT
