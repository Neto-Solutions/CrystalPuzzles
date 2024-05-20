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

const supervisorRouter = [
	{
		path: '/',
		element: <MainPage />
	},
	{
		path: '/analytic',
		element: <AnalyticPage />,
		local: 'Аналитика'
	},
	{
		path: '/analytic/view',
		element: <AnalyticViewPage />
	},
	{
		path: '/progress',
		element: <ProgressGraphPage />,
		local: 'Графики прогресса'
	},
	{
		path: '/progress/view',
		element: <ProgressGraphViewPage />
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

export default supervisorRouter;
