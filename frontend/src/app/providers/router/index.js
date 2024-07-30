import { createBrowserRouter } from 'react-router-dom';
import App from '@app/App';
import {
	checkInRouter,
	supervisorRouter,
	studentRouter,
	trainerRouter
} from '@shared/const/routes';
import { ErrorPage } from '@pages/shared';

function createRouter(role) {
	return createBrowserRouter([
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
	]);
}

export { createRouter };
