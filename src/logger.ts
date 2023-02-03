import winston from 'winston'

const transports = [new winston.transports.File({ filename: 'logs/console.error.log', level: 'error' }), new winston.transports.File({ filename: 'logs/console.log' })]

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  //format: winston.format.json(),
  //defaultMeta: { service: 'app' },
  transports
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  )
}

export default logger
