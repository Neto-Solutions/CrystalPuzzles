import MainPage from '@kid/Main.page';
import TrainPage from '@kid/Train.page';
import CheckListPage from '@kid/Check.list.page';
import SchedulePage from '@kid/Schedule.page';
import FeedbackPage from '@kid/Feedback.page';
import AppraisalPage from '@kid/Appraisal.page';

const kidRouter = [
	{
		path: '/',
		element: <MainPage />
	},
	{
		path: '/train',
		element: <TrainPage />,
		local: 'Тренировки'
	},
	{
		path: '/check-list',
		element: <CheckListPage />,
		local: 'Чек-листы'
	},
	{
		path: '/schedule',
		element: <SchedulePage />,
		local: 'Расписание'
	},
	{
		path: '/feedback',
		element: <FeedbackPage />,
		local: 'Обратная связь'
	},
	{
		path: '/appraisal',
		element: <AppraisalPage />
	}
];

export default kidRouter;
