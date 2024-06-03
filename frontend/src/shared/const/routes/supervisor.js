import MainPage from '@supervisor/Main.page';
import AnalyticPage from '@supervisor/Analytic.page';
import AnalyticViewPage from '@supervisor/Analytic.view.page';
import ProgressGraphPage from '@supervisor/Progress.graph.page';
import ProgressGraphViewPage from '@supervisor/Progress.graph.view.page';
import SchedulePage from '@supervisor/Schedule.page';
import CreateSchedulePage from '@supervisor/Create.schedule.page';
import FeedbackPage from '@supervisor/Feedback.page';
import EvaluationTable from '@supervisor/Evaluation.table.page';
import NotificationPage from '@supervisor/Notification.page';
import analytics from '../../assets/svg/sidebar/analytics.svg';
import progress from '../../assets/svg/sidebar/progress.svg';
import tables from '../../assets/svg/sidebar/tables.svg';
import schedule from '../../assets/svg/sidebar/schedule.svg';
import feedback from '../../assets/svg/sidebar/Feedback.svg';
import home from '../../assets/svg/sidebar/home.svg';
import AvatarPage from '@supervisor/Avatar.form.page';

const supervisorRouter = [
	{
		path: '/',
		element: <MainPage />,
		img: home
	},
	{
		path: '/progress',
		element: <ProgressGraphPage />,
		local: 'Графики прогресса',
		img: progress
	},
	{
		path: '/progress/view',
		element: <ProgressGraphViewPage />
	},
	{
		path: '/analytic',
		element: <AnalyticPage />,
		local: 'Аналитика',
		img: analytics
	},
	{
		path: '/analytic/view',
		element: <AnalyticViewPage />
	},
	{
		path: '/evaluation',
		element: <EvaluationTable />,
		local: 'Таблицы',
		img: tables
	},
	{
		path: '/schedule',
		element: <SchedulePage />,
		local: 'Расписание',
		img: schedule
	},
	{
		path: '/schedule/create',
		element: <CreateSchedulePage />
	},
	{
		path: '/feedback',
		element: <FeedbackPage />,
		local: 'Обратная связь',
		img: feedback
	},
	{
		path: '/notifications',
		element: <NotificationPage />
	},
	{
		path: '/avatar',
		element: <AvatarPage />
	}
];

export default supervisorRouter;
