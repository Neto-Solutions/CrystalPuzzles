import {
	FeedbackPage,
	NotificationPage,
	ProfilePage,
	UsersSearchPage
} from '@pages/shared';
import {
	MainPage,
	CheckListPage,
	GroupListPage,
	CreateGroupPage,
	TrainerExercisePage
} from '@trainer';
import { AvatarPage, SchedulePage } from '@pages/shared';
import { lessons, groups } from '@const';

import feedback from 'assets/sidebar/feedback.svg';
import schedule from 'assets/sidebar//schedule.svg';
import group from 'assets/sidebar/group.svg';
import students from 'assets/sidebar/students.svg';
import home from 'assets/sidebar/home.svg';

const trainerRouter = [
	{
		path: '/',
		element: <MainPage title="Главная страница" />,
		img: home,
		loader: () => {
			return {
				lessons
			};
		}
	},
	{
		path: '/notifications',
		element: <NotificationPage title="Уведомления" />
	},
	{
		path: '/schedule',
		element: <SchedulePage link title="Расписание" />,
		local: 'Расписание',
		img: schedule,
		loader: () => {
			return {
				lessons
			};
		}
	},
	{
		path: '/schedule/:id',
		element: <CheckListPage title="Чек-листы" />
	},
	{
		path: '/groups',
		element: <GroupListPage title="Группы" />,
		local: 'Группы',
		img: group,
		loader: () => {
			return {
				groups
			};
		}
	},
	{
		path: '/group/create',
		element: <CreateGroupPage title="Создать группу" />
	},
	{
		path: '/students',
		element: <UsersSearchPage title="Ученики" />,
		local: 'Ученики',
		img: students
	},
	{
		path: '/students/:id',
		element: <ProfilePage title="Ученик" />
	},
	{
		path: '/feedback',
		element: <FeedbackPage title="Обратная связь" />,
		local: 'Обратная связь',
		img: feedback
	},
	{
		path: '/avatar',
		element: <AvatarPage title="Изменить аватарку" />
	},
	{
		path: '/exercise',
		element: <TrainerExercisePage title="Занятия" />,
		loader: () => {
			return {
				lessons
			};
		}
	},
	{
		path: '/profile',
		element: <ProfilePage title="Мои личные данные" />
	}
];

export default trainerRouter;
