import { createLogger, format, transports } from "winston";
import morgan from "morgan";
import chalk from "chalk";

const { combine, timestamp, json, colorize, printf } = format;

// Custom format for console logging with colors
const consoleLogFormat = combine(
  colorize(),
  timestamp(),
  printf(({ level, message, timestamp }) => {
    return `${timestamp} - ${level}: ${message}`;
  }),
);

// Custom format for file logging
const fileLogFormat = combine(timestamp(), json());

// Create a Winston logger
export const logger = createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    new transports.File({
      filename: "app.log",
      format: fileLogFormat,
    }),
  ],
});

// Get the current timestamp
export const getTimestamp = () => {
  return new Date().toISOString();
};

// Get the status symbol based on the status code
export const getStatusSymbol = (statusCode: number) => {
  if (statusCode >= 500) return "❌";
  if (statusCode >= 400) return "⚠️";
  return "✅";
};

// Get the log level based on the status code
export const getLogLevel = (statusCode: number) => {
  if (statusCode >= 500) return "error";
  if (statusCode >= 400) return "warn";
  return "info";
};

// Morgan logging middleware
const morganFormat = ":method :url :status :res[content-length] :response-time ms";

const morganOptions = {
  stream: {
    write: (message: string) => {
      const parts = message.split(" ");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [method, url, status, contentLength, responseTimeRaw, msRaw] = parts;

      const responseTime = `${responseTimeRaw} ${msRaw.trim()}`;
      const statusSymbol = getStatusSymbol(parseInt(status));
      const logLevel = getLogLevel(parseInt(status));

      // Use Chalk for advanced text styling
      const methodColor = chalk.yellow(method);
      const urlColor = chalk.cyan(url);
      const statusColor =
        parseInt(status) >= 500
          ? chalk.red(status)
          : parseInt(status) >= 400
            ? chalk.yellow(status)
            : chalk.green(status);
      const responseTimeColor = chalk.magenta(responseTime);

      logger[logLevel](`${statusSymbol} ${methodColor} ${urlColor} ${statusColor} (${responseTimeColor})`);
    },
  },
};

export const loggerMiddleware = morgan(morganFormat, morganOptions);
