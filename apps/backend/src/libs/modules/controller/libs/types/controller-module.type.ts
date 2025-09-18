import { type ServerApplicationRouteParameters } from '~/libs/modules/server-application/libs/types/types.js';

import { type ControllerRouteParameters } from './controller-route-parameters.type.js';

type ControllerModule = {
  addRoute(options: ControllerRouteParameters): void;
  routes: ServerApplicationRouteParameters[];
};

export { type ControllerModule };
