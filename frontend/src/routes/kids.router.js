import MainPage from '../pages/kids/Main.page';
import TrainPage from '../pages/kids/Train.page';
import CheckListPage from '../pages/kids/Check.list.page';
import SchedulePage from '../pages/kids/Schedule.page';
import FeedbackPage from '../pages/kids/Feedback.page';
import AppraisalPage from '../pages/kids/Appraisal.page';

const kidsRouter = [
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

export default kidsRouter;
