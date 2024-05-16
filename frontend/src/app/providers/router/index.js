import { createBrowserRouter, redirect } from 'react-router-dom';
import App from '../app/App';
import studentRouter from './student.router';
import methodistRouter from './methodist.router';
import trainerRouter from './trainer.router';
import checkInRouter from './check.in.router';
function createRouter(role) {
	return createBrowserRouter([
		{
			path: '/',
			element: <App />,
			children:
				(role === 'student' && studentRouter) ||
				(role === 'methodist' && methodistRouter) ||
				(role === 'trainer' && trainerRouter)
		},
		{
			path: '/',
			element: <App check_in />,
			children: checkInRouter
		},
		{
			path: '*',
			loader: () => redirect('/')
		}
	]);
}

export { createRouter };
