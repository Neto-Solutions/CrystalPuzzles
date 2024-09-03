import { studentRouter, supervisorRouter, trainerRouter } from '.';
import CheckInPage from '@checkIn/CheckIn';
import App from '@app/App';
import ErrorPage from '@pages/shared/Error/Error';
import { redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProfile } from '@app/providers/store/profile';

const MainRouter = (): any => {
	const { role } = useSelector(selectProfile);
	return [
		{
			path: '/',
			element: <App />,
			errorElement: <ErrorPage />,
			loader: () => {
				if (!role) return redirect('/login');
				return null;
			},
			children:
				(role == 'student' && studentRouter) ||
				(role == 'supervisor' && supervisorRouter) ||
				(role == 'trainer' && trainerRouter)
		},
		{
			path: 'login',
			element: <CheckInPage login />
		},
		{
			path: 'registration',
			element: <CheckInPage />
		}
	];
};

export default MainRouter;
