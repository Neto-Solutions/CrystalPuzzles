import CheckInPage from '@check.in/Check.in.page';
import СonfidentialityPage from '@check.in/Сonfidentiality.page';

const checkInRouter = [
	{
		path: 'login',
		element: <CheckInPage login />
	},
	{
		path: 'registration',
		element: <CheckInPage />
	},
	{
		path: 'politics',
		element: <СonfidentialityPage />
	}
];

export default checkInRouter;
