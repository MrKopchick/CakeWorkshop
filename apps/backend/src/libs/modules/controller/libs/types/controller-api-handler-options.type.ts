type ControllerAPIHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions
> = {
  body: T['body'];
  params: T['params'];
  query: T['query'];
};

type DefaultApiHandlerOptions = {
  body?: unknown;
  params?: unknown;
  query?: unknown;
};

export { type ControllerAPIHandlerOptions };
