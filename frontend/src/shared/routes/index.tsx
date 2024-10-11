import { studentRouter, supervisorRouter, trainerRouter } from '.';
import CheckInPage from '@checkIn/CheckIn';
import App from '@app/App';
import { ProfilePage, ErrorPage } from '@pages/shared';
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
			children: [
				{
					path: '/profile',
					element: <ProfilePage title="Мои личные данные" />
				},
				...(role === 'student'
					? studentRouter
					: role === 'trainer'
						? trainerRouter
						: supervisorRouter)
			]
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

export { default as supervisorRouter } from './supervisor';
export { default as trainerRouter } from './trainer';
export { default as studentRouter } from './student';
