import { type Controller } from '../controller/controller.js';
import { joinPath } from '../path/path.js';
import { type ServerApi } from './libs/types/types.js';

type Constructor = {
  routes: Controller['routes'];
  version: string;
};

class ServerAppApi implements ServerApi {
  #routes: Controller['routes'];

  #version: string;

  public constructor({ routes, version }: Constructor) {
    this.#version = version;
    this.#routes = routes.map(handler => ({
      ...handler,
      url: joinPath([`/${this.#version}`, handler.url])
    }));
  }

  public get routes(): Controller['routes'] {
    return this.#routes;
  }
}

export { ServerAppApi };
