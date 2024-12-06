import { studentRouter, supervisorRouter, trainerRouter } from '.';
import CheckInPage from '@checkIn/CheckIn';
import App from '@app/App';
import { ProfilePage, ErrorPage } from '@pages/shared';
import { redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProfile } from '@app/providers/store/profile';
import ChangePass from '@pages/checkIn/changePass/ChangePass';
import Cookies from 'js-cookie';

const MainRouter = (): any => {
	const { role } = useSelector(selectProfile);
	return [
		{
			path: '/',
			element: <App />,
			errorElement: <ErrorPage />,
			loader: () => {
				if (!role || role === 'admin') {
					Cookies.remove('token');
					return redirect('/login');
				}
				return null;
			},
			children: [
				{
					path: '/profile',
					element: <ProfilePage title="Мои личные данные" />
				},
				...(role === 'student'
					? studentRouter
					: role === 'trainer'
						? trainerRouter
						: role === 'supervisor'
							? supervisorRouter
							: [])
			]
		},
		{
			path: 'login',
			element: <CheckInPage login />
		},
		{
			path: 'registration',
			element: <CheckInPage />
		},
		{
			path: 'change-password',
			element: <ChangePass />
		}
	];
};

export default MainRouter;

export { default as supervisorRouter } from './supervisor';
export { default as trainerRouter } from './trainer';
export { default as studentRouter } from './student';
