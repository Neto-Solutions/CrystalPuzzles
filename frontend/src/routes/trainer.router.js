import MainPage from '../pages/trainer/Main.page';
import NotificationPage from '../pages/trainer/Notification.page';
import CheckListPage from '../pages/trainer/Check.list.page';
import SchefulePage from '../pages/trainer/Schedule.page';
import TeamsPage from '../pages/trainer/Teams.page';
import CreateGroupPage from '../pages/trainer/Create.group.page';
import StudentsList from '../pages/trainer/Students.list.page';
import StudentPage from '../pages/trainer/Student.page';
import FeedbackPage from '../pages/trainer/Feedback.page';

const trainerRouter = [
	{
		path: '/',
		element: <MainPage />
	},
	{
		path: '/notification',
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
	}
];

export default trainerRouter;
