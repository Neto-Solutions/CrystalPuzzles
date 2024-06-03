import MainPage from '@student/Main.page';
import TrainPage from '@student/Train.page';
import CheckListPage from '@student/Check.list.page';
import SchedulePage from '@student/Schedule.page';
import FeedbackPage from '@student/Feedback.page';
import AppraisalPage from '@student/Appraisal.page';
import training from '../../assets/svg/sidebar/Training.svg';
import checkList from '../../assets/svg/sidebar/check list.svg';
import schedule from '../../assets/svg/sidebar/schedule.svg';
import feedback from '../../assets/svg/sidebar/Feedback.svg';
import home from '../../assets/svg/sidebar/home.svg';

const studentRouter = [
	{
		path: '/',
		element: <MainPage />,
		img: home
	},
	{
		path: '/train',
		element: <TrainPage />,
		local: 'Тренировки',
		img: training
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
		path: '/feedback',
		element: <FeedbackPage />,
		local: 'Обратная связь',
		img: feedback
	},
	{
		path: '/appraisal',
		element: <AppraisalPage />
	}
];

export default studentRouter;
