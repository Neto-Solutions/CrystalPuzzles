import { createBrowserRouter, redirect } from 'react-router-dom';
import App from '../app/App';
import kidRouter from './kid.router';
import methodistRouter from './methodist.router';
import trainerRouter from './trainer.router';
import checkInRouter from './check.in.router';

export default function createRouter(role) {
	return createBrowserRouter([
		{
			path: '/',
			element: <App />,
			loader: () => {
				return !role && redirect('/login');
			},
			children:
				(role === 'kid' && kidRouter) ||
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
