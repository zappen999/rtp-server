const RTPServer = require('./');

const server = new RTPServer(8282, 123);

server.listen();
