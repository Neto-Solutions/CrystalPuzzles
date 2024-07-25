import { createBrowserRouter } from 'react-router-dom';
import App from '@app/App';
import {
	checkInRouter,
	supervisorRouter,
	studentRouter,
	trainerRouter
} from '@shared/const/routes';

function createRouter(role) {
	return createBrowserRouter([
		{
			path: '/',
			element: <App />,
			errorElement: <div>Error 404</div>,
			children:
				(role === 'student' && studentRouter) ||
				(role === 'supervisor' && supervisorRouter) ||
				(role === 'trainer' && trainerRouter)
		},
		...checkInRouter
	]);
}

export { createRouter };
