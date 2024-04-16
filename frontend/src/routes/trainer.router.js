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
		element: <NotificationPage />
	},
	{
		path: '/check-list',
		element: <CheckListPage />
	},
	{
		path: '/schedule',
		element: <SchefulePage />
	},
	{
		path: '/teams',
		element: <TeamsPage />
	},
	{
		path: '/group/create',
		element: <CreateGroupPage />
	},
	{
		path: '/students',
		element: <StudentsList />
	},
	{
		path: '/student',
		element: <StudentPage />
	},
	{
		path: '/feedback',
		element: <FeedbackPage />
	}
];

export default trainerRouter;
