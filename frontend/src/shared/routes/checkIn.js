import CheckInPage from '@checkIn/CheckIn';

const checkInRouter = [
	{
		path: 'login',
		element: <CheckInPage login />
	},
	{
		path: 'registration',
		element: <CheckInPage />
	}
];

export default checkInRouter;
