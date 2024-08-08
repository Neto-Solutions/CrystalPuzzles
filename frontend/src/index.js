import '@app/styles/index.scss';
import * as serviceWorker from './serviceWorkerRegistration';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '@app/providers/store';
import RouterProvider from '@app/providers/router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<RouterProvider />
	</Provider>
);

serviceWorker.register();
