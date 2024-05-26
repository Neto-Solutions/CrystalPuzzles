import MainPage from '@trainer/Main.page';
import NotificationPage from '@trainer/Notification.page';
import CheckListPage from '@trainer/Check.list.page';
import SchefulePage from '@trainer/Schedule.page';
import TeamsPage from '@trainer/Teams.page';
import CreateGroupPage from '@trainer/Create.group.page';
import StudentsList from '@trainer/Students.list.page';
import StudentPage from '@trainer/Student.page';
import FeedbackPage from '@trainer/Feedback.page';
import AvatarPage from '@trainer/Avatar.form.page';

const trainerRouter = [
	{
		path: '/',
		element: <MainPage />
	},
	{
		path: '/notifications',
		element: <NotificationPage />,
		local: 'Уведомления'
	},
	{
		path: '/check-list',
		element: <CheckListPage />,
		local: 'Чек-листы'
	},
	{
		path: '/schedule',
		element: <SchefulePage />,
		local: 'Расписание'
	},
	{
		path: '/teams',
		element: <TeamsPage />
	},
	{
		path: '/group/create',
		element: <CreateGroupPage />,
		local: 'Группы'
	},
	{
		path: '/students',
		element: <StudentsList />,
		local: 'Ученики'
	},
	{
		path: '/student',
		element: <StudentPage />
	},
	{
		path: '/feedback',
		element: <FeedbackPage />,
		local: 'Обратная связь'
	},
	{
		path: '/avatar',
		element: <AvatarPage />
	}
];

export default trainerRouter;
