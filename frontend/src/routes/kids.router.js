import MainPage from '@kids/Main.page';
import TrainPage from '@kids/Train.page';
import CheckListPage from '@kids/Check.list.page';
import SchedulePage from '@kids/Schedule.page';
import FeedbackPage from '@kids/Feedback.page';
import AppraisalPage from '@kids/Appraisal.page';

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
