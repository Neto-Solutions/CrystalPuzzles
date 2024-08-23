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
	CreateGroupPage
} from '@trainer';

import feedback from 'assets/sidebar/feedback.svg';
import schedule from 'assets/sidebar//schedule.svg';
import group from 'assets/sidebar/group.svg';
import students from 'assets/sidebar/students.svg';
import home from 'assets/sidebar/home.svg';
import { AvatarPage, SchedulePage } from '@pages/shared';

import { lessons } from '../const/lessons';
import { groups } from '../const/groups';
import { users } from '../const/users';

const trainerRouter = [
	{
		path: '/',
		element: <MainPage />,
		img: home,
		loader: () => {
			return {
				lessons
			};
		}
	},
	{
		path: '/notifications',
		element: <NotificationPage />
	},
	{
		path: '/schedule',
		element: <SchedulePage link />,
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
		element: <CheckListPage />,
		loader: ({ params: { id }} : any) => {
			return lessons.find((lesson) => lesson._id == id);
		}
	},
	{
		path: '/groups',
		element: <GroupListPage />,
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
		element: <CreateGroupPage />
	},
	{
		path: '/students',
		element: <UsersSearchPage title="Ученики" />,
		local: 'Ученики',
		img: students
	},
	{
		path: '/students/:id',
		element: <ProfilePage />,
		loader: ({ params: { id }} : any) => {
			return users.find((user) => user._id == id);
		}
	},
	{
		path: '/feedback',
		element: <FeedbackPage />,
		local: 'Обратная связь',
		img: feedback
	},
	{
		path: '/avatar',
		element: <AvatarPage />
	}
];

export default trainerRouter;
