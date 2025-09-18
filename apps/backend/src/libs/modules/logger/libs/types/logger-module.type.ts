type LogFunction = (
  message: string,
  parameters?: Record<string, unknown>
) => void;

type LoggerModule = {
  debug: LogFunction;
  error: LogFunction;
  info: LogFunction;
  warn: LogFunction;
};

export { type LoggerModule };
