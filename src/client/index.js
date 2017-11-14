import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';

import match from 'react-router/lib/match';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import routes from '../routes';

const root = document.querySelector('#root');

const mount = RootComponent => {
  // https://github.com/ReactTraining/react-router/blob/v2.6.1/docs/guides/ServerRendering.md#async-routes
  match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
    render(
      <AppContainer>
        <Router {...renderProps} />
      </AppContainer>,
      root
    );
  });
};

if (module.hot) {
  module.hot.accept('./Root', () => {
    // eslint-disable-next-line global-require,import/newline-after-import
    const RootComponent = require('./Root').default;
    mount(RootComponent);
  });
}

mount(Root);
