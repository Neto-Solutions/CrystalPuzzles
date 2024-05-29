import MainPage from '@student/Main.page';
import TrainPage from '@student/Train.page';
import CheckListPage from '@student/Check.list.page';
import SchedulePage from '@student/Schedule.page';
import FeedbackPage from '@student/Feedback.page';
import AppraisalPage from '@student/Appraisal.page';
import AvatarPage from '@student/Avatar.form.page';

const studentRouter = [
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
	},
	{
		path: '/avatar',
		element: <AvatarPage />
	}
];

export default studentRouter;
