import {
	FeedbackPage,
	NotificationPage,
	ProfilePage,
	ProfileListPage
} from '@pages/shared';
import {
	MainPage,
	CheckListPage,
	GroupListPage,
	CreateGroupPage
} from '@trainer';

import feedback from '../../assets/svg/sidebar/Feedback.svg';
import checkList from '../../assets/svg/sidebar/check list.svg';
import schedule from '../../assets/svg/sidebar/schedule.svg';
import group from '../../assets/svg/sidebar/group.svg';
import students from '../../assets/svg/sidebar/students.svg';
import home from '../../assets/svg/sidebar/home.svg';
import { AvatarPage, SchedulePage } from '@pages/shared';

const trainerRouter = [
	{
		path: '/',
		element: <MainPage />,
		img: home
	},
	{
		path: '/notifications',
		element: <NotificationPage />,
		local: 'Уведомления'
	},
	{
		path: '/check-list',
		element: <CheckListPage />,
		local: 'Чек-листы',
		img: checkList
	},
	{
		path: '/schedule',
		element: <SchedulePage />,
		local: 'Расписание',
		img: schedule
	},
	{
		path: '/groups',
		element: <GroupListPage />,
		local: 'Группы',
		img: group
	},
	{
		path: '/group/create',
		element: <CreateGroupPage />
	},
	{
		path: '/students',
		element: <ProfileListPage />,
		local: 'Ученики',
		img: students
	},
	{
		path: '/student',
		element: <ProfilePage />
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
