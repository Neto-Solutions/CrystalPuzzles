import {
	studentRouter,
	supervisorRouter,
	trainerRouter,
	checkInRouter
} from './';

import App from '@app/App';
import ErrorPage from '@pages/shared/Error/Error';

const MainRouter = (role) => {
	return [
		{
			path: '/',
			element: <App />,
			errorElement: <ErrorPage />,
			children:
				(role === 'student' && studentRouter) ||
				(role === 'supervisor' && supervisorRouter) ||
				(role === 'trainer' && trainerRouter)
		},
		...checkInRouter
	];
};

export default MainRouter;
