import MainPage from '@methodist/Main.page';
import AnalyticPage from '@methodist/Analytic.page';
import AnalyticViewPage from '@methodist/Analytic.view.page';
import ProgressGraphPage from '@methodist/Progress.graph.page';
import ProgressGraphViewPage from '@methodist/Progress.graph.view.page';
import SchedulePage from '@methodist/Schedule.page';
import CreateSchedulePage from '@methodist/Create.schedule.page';
import FeedbackPage from '@methodist/Feedback.page';
import EvaluationTable from '@methodist/Evaluation.table.page';
import NotificationPage from '@methodist/Notification.page';

const methodistRouter = [
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

export default methodistRouter;
