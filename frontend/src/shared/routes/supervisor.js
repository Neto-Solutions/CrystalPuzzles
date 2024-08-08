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
import { AvatarPage } from '@pages/shared';

import { users } from '@shared/const/users';

const supervisorRouter = [
	{
		path: '/',
		element: <MainPage />,
		img: home
	},
	{
		path: '/progress',
		element: <UsersListPage />,
		local: 'Графики прогресса',
		img: progress
	},
	{
		path: '/progress/:id',
		element: <ProgressPage />
	},
	{
		path: '/analytic',
		element: <UsersListPage />,
		local: 'Аналитика',
		img: analytics
	},
	{
		path: '/analytic/:id',
		element: <AnalyticsPage />
	},
	{
		path: '/evaluation',
		element: <EvaluationPage />,
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
		path: '/schedule/edit',
		element: <SchedulePage edit />
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
		element: <UsersSearchPage title="Ученики" />
	},
	{
		path: '/students/:id',
		element: <ProfilePage title="Ученики" />,
		loader: ({ params: { id } }) => {
			return users.find((user) => user._id == id);
		}
	},
	{
		path: '/trainers',
		element: <UsersSearchPage title="Тренеры" />
	},
	{
		path: '/trainers/:id',
		element: <ProfilePage title="Тренеры" />,
		loader: ({ params: { id } }) => {
			return users.find((user) => user._id == id);
		}
	}
];

export default supervisorRouter;
