import { RouterProvider } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';

import { Auth } from '../auth/auth.js';
import { Root } from '../root/root.js';

const App: React.FC = () => {
  return (
    <RouterProvider
      routes={[
        {
          children: [
            {
              element: <Root />,
              path: AppRoute.ROOT
            },
            {
              element: <Auth />,
              path: AppRoute.SIGN_IN
            },
            {
              element: <Auth />,
              path: AppRoute.SIGN_UP
            }
          ],
          path: AppRoute.ROOT
        }
      ]}
    />
  );
};

export { App };
