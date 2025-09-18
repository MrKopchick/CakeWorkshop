import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import '~/assets/css/styles.css';
import { store } from '~/libs/modules/store/store.js';

import { App } from './pages/app/app.js';

const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(
  <StrictMode>
    <Provider store={store.instance}>
      <App />
    </Provider>
  </StrictMode>
);
