import CheckInPage from '@check.in/Check.in.page';
import ConfidencePage from '@check.in/Confidence.page';

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
		element: <ConfidencePage />
	}
];

export default checkInRouter;
