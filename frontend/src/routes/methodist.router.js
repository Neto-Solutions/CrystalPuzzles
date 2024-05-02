import MainPage from '../pages/methodist/Main.page';
import AnalyticsPage from '../pages/methodist/Analytics.page';
import AnalyticsViewPage from '../pages/methodist/Analytics.view.page';
import ProgressGraphPage from '../pages/methodist/Progress.graph.page';
import SchedulePage from '../pages/methodist/Schedule.page';
import CreateSchedulePage from '../pages/methodist/Create.schedule.page';
import FeedbackPage from '../pages/methodist/Feedback.page';
import EvaluationTable from '../pages/methodist/Evaluation.table.page';
import NotificationPage from '../pages/methodist/Notification.page';

const methodistRouter = [
	{
		path: '/',
		element: <MainPage />
	},
	{
		path: '/analytics',
		element: <AnalyticsPage />,
		local: 'Аналитика'
	},
	{
		path: '/analytics/view',
		element: <AnalyticsViewPage />
	},
	{
		path: '/progress',
		element: <ProgressGraphPage />,
		local: 'Графики прогресса'
	},
	{
		path: '/schedule',
		element: <SchedulePage />,
		local: 'Расписание'
	},
	{
		path: '/schedule/create',
		element: <CreateSchedulePage />
	},
	{
		path: '/feedback',
		element: <FeedbackPage />,
		local: 'Обратная связь'
	},
	{
		path: '/evaluation',
		element: <EvaluationTable />,
		local: 'Таблицы'
	},
	{
		path: '/notifications',
		element: <NotificationPage />
	}
];

export default methodistRouter;
