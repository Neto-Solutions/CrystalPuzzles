import CheckInPage from '@check.in/Check.in.page';

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
