import './app/styles/index.scss';
import * as serviceWorker from './serviceWorkerRegistration';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/providers/store';
import RouterProvider from './app/providers/router';
import { Tag } from '@shared/ui';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
		<Tag />
		<RouterProvider />
	</Provider>
);

serviceWorker.register();
