import { createBrowserRouter } from 'react-router-dom';
import App from '../app/App';
import kidsRouter from './kids.router';
import methodistRouter from './methodist.router';
import trainerRouter from './trainer.router';
import checkInRouter from './check.in.router';

export default function createRouter(role) {
	return createBrowserRouter([
		{
			path: '/',
			element: <App sidebar />,
			loader: () => {
				return null;
			}, // loader to fetch data before render
			children:
				(role === 'kids' && kidsRouter) ||
				(role === 'methodist' && methodistRouter) ||
				(role === 'trainer' && trainerRouter)
		},
		{
			path: '/',
			element: <App />,
			children: checkInRouter
		}
	]);
}
