import { AvatarPage, SchedulePage } from '@pages/shared';
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

import { lessons } from '@const';

const studentRouter = [
	{
		path: '/',
		element: <MainPage />,
		img: home,
		loader: () => {
			return { lessons };
		}
	},
	{
		path: '/train',
		element: <TrainPage />,
		local: 'Тренировки',
		img: training,
		loader: () => {
			return {
				lessons
			};
		}
	},
	{
		path: '/train/:id',
		element: <ExercisePage />,
		loader: ({ params }: any) => {
			const lesson = lessons.find((l) => l.id === params.id);
			return {
				lesson,
				id: params.id
			};
		}
	},
	{
		path: '/schedule',
		element: <SchedulePage />,
		local: 'Расписание',
		img: schedule,
		loader: () => {
			return {
				lessons
			};
		}
	},
	{
		path: '/avatar',
		element: <AvatarPage />
	},
	{
		path: '/survey',
		element: <SurveyPage />,
		local: 'Анкета',
		img: survey
	},
	{
		path: '/reward',
		element: <RewardPage />,
		local: 'Коллекция наград',
		img: survey
	}
];

export default studentRouter;
