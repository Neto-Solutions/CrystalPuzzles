import { SchedulePage } from '@pages/shared';
import {
	MainPage,
	ExercisePage,
	TrainPage,
	SurveyPage,
	RewardPage
} from '@student';
import training from '@assets/sidebar/train.svg';
import schedule from 'assets/sidebar/schedule.svg';
import home from 'assets/sidebar/home.svg';
import survey from 'assets/sidebar/survey.svg';

const studentRouter = [
	{
		path: '/',
		element: <MainPage title="Главная страница" />,
		img: home
	},
	{
		path: '/train',
		element: <TrainPage title="Мои тренировки" />,
		local: 'Тренировки',
		img: training
	},
	{
		path: '/train/:id',
		element: <ExercisePage title="Мои занятия" />,
		loader: ({ params: { id } }: any) => ({ id })
	},
	{
		path: '/schedule',
		element: <SchedulePage link="/train/" title="Расписание" />,
		local: 'Расписание',
		img: schedule,
		loader: ({ params: { id } }: any) => ({ id })
	},
	{
		path: '/survey',
		element: <SurveyPage title="Анкета" />,
		local: 'Анкета',
		img: survey
	},
	{
		path: '/reward',
		element: <RewardPage title="Коллекция наград" />,
		local: 'Коллекция наград',
		img: survey
	}
];

export default studentRouter;
