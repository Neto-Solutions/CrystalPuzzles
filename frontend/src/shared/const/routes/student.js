import MainPage from '@student/Main.page';
import TrainPage from '@student/Train.page';
import ExercisePage from '@student/Exercise.page';
import SchedulePage from '@student/Schedule.page';
import AvatarPage from '@student/Avatar.form.page';
import SurveyPage from '@student/Survey.page';
import training from '../../assets/svg/sidebar/Training.svg';
import schedule from '../../assets/svg/sidebar/schedule.svg';
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
		path: '/exercise',
		element: <ExercisePage />
	},
	{
		path: '/schedule',
		element: <SchedulePage />,
		local: 'Расписание',
		img: schedule
	},
	{
		path: '/avatar',
		element: <AvatarPage />
	},
	{
		path: '/survey',
		element: <SurveyPage />,
		local: 'Анкета',
		img: 'feedback'
	}
];

export default studentRouter;
