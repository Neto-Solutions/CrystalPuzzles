import {
	FeedbackPage,
	NotificationPage,
	ProfilePage,
	ProfileListPage
} from '@pages/shared';

import { MainPage } from '@supervisor/MainPage/ui/MainPage';
import { TrainerAnalyticsPage } from '@supervisor/TrainerAnalyticsPage/ui/TrainerAnalyticsPage';
import { DetailedAnalyticsPage } from '@supervisor/DetailedAnalyticsPage/ui/DetailedAnalyticsPage';
import { EvaluationTablePage } from '@supervisor/EvaluationTablePage/ui/EvaluationTablePage';
import ProgressGraphPage from '@supervisor/Progress.graph.page';
import ProgressGraphViewPage from '@supervisor/Progress.graph.view.page';
import SchedulePage from '@supervisor/Schedule.page';
import CreateSchedulePage from '@supervisor/Create.schedule.page';

import analytics from 'assets/sidebar/analytics.svg';
import progress from 'assets/sidebar/progress.svg';
import tables from 'assets/sidebar/tables.svg';
import schedule from 'assets/sidebar/schedule.svg';
import feedback from 'assets/sidebar/feedback.svg';
import home from 'assets/sidebar/home.svg';
import { AvatarPage } from '@pages/shared';

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
		path: '/analytic', //заменить
		element: <TrainerAnalyticsPage />,
		local: 'Аналитика',
		img: analytics
	},
	{
		path: '/analytic/view', //заменить
		element: <DetailedAnalyticsPage />
	},
	{
		path: '/evaluation', //заменить
		element: <EvaluationTablePage />,
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
	},
	{
		path: '/students',
		element: <ProfileListPage title="Ученики" />
	},
	{
		path: '/students/:id',
		element: <ProfilePage title="Ученики" />
	},
	{
		path: '/trainers',
		element: <ProfileListPage title="Тренеры" />
	},
	{
		path: '/trainers/:id',
		element: <ProfilePage title="Тренеры" />
	}
];

export default supervisorRouter;
