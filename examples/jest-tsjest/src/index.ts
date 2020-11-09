import { createServer, IncomingMessage, ServerResponse } from 'http';
import { lookup } from 'geoip-lite'

const port = 5000;

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    const obj:any = request.headers
    obj.geo = lookup(obj.remoteAddress = request.socket.remoteAddress)
    const json:string = JSON.stringify(obj)
    console.log(json);
    response.end(json);
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

export const whatIsTheMeaningOfLife = server;
