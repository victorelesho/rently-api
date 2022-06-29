require ('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

winston.configure({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
        winston.format.metadata()
    ),
    defaultMeta: { service: 'your-service-name' },
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.simple()
        )
      }),  

      new winston.transports.File({
        filename: 'logfile.log',
        handleExceptions: true,
        handleRejections: true
      }),
      
      new winston.transports.MongoDB({ 
        db: 'mongodb://localhost/vidly',
        level: 'info', 
        options: { useUnifiedTopology: true },
        handleExceptions: true,
        handleRejections: true
     })
    ],
});