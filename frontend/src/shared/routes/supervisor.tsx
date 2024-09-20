import {
	FeedbackPage,
	NotificationPage,
	ProfilePage,
	UsersSearchPage
} from '@pages/shared';

import {
	MainPage,
	ProgressPage,
	AnalyticsPage,
	EvaluationPage,
	UsersListPage,
	SchedulePage
} from '@supervisor';

import analytics from 'assets/sidebar/analytics.svg';
import progress from 'assets/sidebar/progress.svg';
import tables from 'assets/sidebar/tables.svg';
import schedule from 'assets/sidebar/schedule.svg';
import feedback from 'assets/sidebar/feedback.svg';
import home from 'assets/sidebar/home.svg';

const supervisorRouter = [
	{
		path: '/',
		element: <MainPage title="Главная страница" />,
		img: home
	},
	{
		path: '/progress',
		element: (
			<UsersListPage type="progress" title="График прогресса тренеров" />
		),
		local: 'Графики прогресса',
		img: progress
	},
	{
		path: '/progress/:id',
		element: <ProgressPage title="График прогресса" />,
		loader: ({ params: { id } }: any) => ({ id })
	},
	{
		path: '/analytic',
		element: <UsersListPage type="analytic" title="Аналитика" />,
		local: 'Аналитика',
		img: analytics
	},
	{
		path: '/analytic/:id',
		element: <AnalyticsPage title="Аналитика" />,
		loader: ({ params: { id } }: any) => ({ id })
	},
	{
		path: '/evaluation',
		element: <EvaluationPage title="Оценочная таблица эффективности" />,
		local: 'Таблицы',
		img: tables
	},
	{
		path: '/schedule',
		element: <SchedulePage title="Расписание тренеров" />,
		local: 'Расписание',
		img: schedule
	},
	{
		path: '/schedule/edit',
		element: <SchedulePage edit title="Составить расписание тренеров" />
	},
	{
		path: '/feedback',
		element: <FeedbackPage title="Обратная связь" />,
		local: 'Обратная связь',
		img: feedback
	},
	{
		path: '/notifications',
		element: <NotificationPage title="Уведомления" />
	},
	{
		path: '/students',
		element: <UsersSearchPage title="Ученики" />
	},
	{
		path: '/students/:id',
		element: <ProfilePage title="Ученик" />,
		loader: ({ params: { id } }: any) => ({ id })
	},
	{
		path: '/trainers',
		element: <UsersSearchPage title="Тренеры" />
	},
	{
		path: '/trainers/:id',
		element: <ProfilePage title="Тренер" />,
		loader: ({ params: { id } }: any) => ({ id })
	}
];

export default supervisorRouter;
