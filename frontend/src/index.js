import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from '@app/store';
import createRouter from './routes';
import { selectUser } from '@entities/User/slice';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Root />
		</Provider>
	</React.StrictMode>
);

function Root() {
	const { role } = useSelector(selectUser);
	const router = useMemo(() => {
		return createRouter(role);
	}, [role]);
	return <RouterProvider router={router} />;
}
