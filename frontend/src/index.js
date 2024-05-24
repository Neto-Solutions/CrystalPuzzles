import '@app/styles/index.scss';
import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';

import { Provider, useSelector } from 'react-redux';
import { store } from '@app/providers/store';

import { RouterProvider as Router } from 'react-router-dom';
import { createRouter } from '@app/providers/router';

import { selectUser } from '@entities/user';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<RouterProvider />
	</Provider>
);

function RouterProvider() {
	const { role } = useSelector(selectUser);
	const router = useMemo(() => {
		return createRouter(role);
	}, [role]);
	return <Router router={router} />;
}
