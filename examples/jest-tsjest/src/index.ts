import { createServer, IncomingMessage, ServerResponse } from 'http';

const port = 5000;

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    response.end(JSON.stringify(request.headers));
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// import * as http from 'http' const requestListener = function (req, res) {
// res.writeHead(200); res.end('Hello, World!'); console.log(req, res); }

// const server = http.createServer(requestListener);
// server.port = 8080;
// console.log('Server started on ${server.port}')
// server.listen(server.port);

export const whatIsTheMeaningOfLife = server;
