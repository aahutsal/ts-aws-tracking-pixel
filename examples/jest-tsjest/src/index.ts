import { createServer, IncomingMessage, ServerResponse } from 'http'
import { lookup } from 'geoip-lite'
import * as winston from 'winston'

const logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
            //
            // - Write all logs with level `error` and below to `error.log`
            // - Write all logs with level `info` and below to `combined.log`
            //
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'combined.log' }),
          ],
});
 
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
      logger.add(new winston.transports.Console({
            format: winston.format.simple(),
          }));
}


const port = 5000

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    const cache = []
    const endless = (key, value) => {
        if (typeof value === 'object' && value !== null) {
            // Duplicate reference found, discard key
            if (cache.includes(value)) return

            // Store value in our collection
            cache.push(value)
        }
        return value
    }
    console.info(JSON.stringify(request, endless))
  const obj:any = request.headers
  obj.geo = lookup(obj.remoteAddress = request.socket.remoteAddress)
  const json:string = JSON.stringify(obj)
    logger.debug(json)
    response.writeHead(302, {
        'Location': 'https://bit.ly/' + request.url

    });
    response.end()
    //response.end(JSON.stringify(request, endless))
})

server.listen(port, () => {
  logger.debug(`Server listening on port ${port}`)
})

export const app = server
