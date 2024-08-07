import {
	studentRouter,
	supervisorRouter,
	trainerRouter,
	checkInRouter
} from './';

import App from '@app/App';
import ErrorPage from '@pages/shared/Error/Error';
import { redirect } from 'react-router-dom';

const MainRouter = (role) => {
	return [
		{
			path: '/',
			element: <App />,
			errorElement: <ErrorPage />,
			loader: () => {
				if (
					!role &&
					location.pathname !== '/login' &&
					location.pathname !== '/registration'
				)
					return redirect('/login');
			},
			children:
				(role === 'student' && studentRouter) ||
				(role === 'supervisor' && supervisorRouter) ||
				(role === 'trainer' && trainerRouter)
		},
		...checkInRouter
	];
};

export default MainRouter;
