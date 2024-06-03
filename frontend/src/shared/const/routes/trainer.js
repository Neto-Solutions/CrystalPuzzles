import MainPage from '@trainer/Main.page';
import NotificationPage from '@trainer/Notification.page';
import CheckListPage from '@trainer/Check.list.page';
import SchefulePage from '@trainer/Schedule.page';
import TeamsPage from '@trainer/Teams.page';
import CreateGroupPage from '@trainer/Create.group.page';
import StudentsList from '@trainer/Students.list.page';
import StudentPage from '@trainer/Student.page';
import FeedbackPage from '@trainer/Feedback.page';
import feedback from '../../assets/svg/sidebar/Feedback.svg';
import checkList from '../../assets/svg/sidebar/check list.svg';
import schedule from '../../assets/svg/sidebar/schedule.svg';
import group from '../../assets/svg/sidebar/group.svg';
import students from '../../assets/svg/sidebar/students.svg';
import home from '../../assets/svg/sidebar/home.svg';

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
		element: <SchefulePage />,
		local: 'Расписание',
		img: schedule
	},
	{
		path: '/teams',
		element: <TeamsPage />
	},
	{
		path: '/group/create',
		element: <CreateGroupPage />,
		local: 'Группы',
		img: group
	},
	{
		path: '/students',
		element: <StudentsList />,
		local: 'Ученики',
		img: students
	},
	{
		path: '/student',
		element: <StudentPage />
	},
	{
		path: '/feedback',
		element: <FeedbackPage />,
		local: 'Обратная связь',
		img: feedback
	}
];

export default trainerRouter;
