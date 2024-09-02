import { AvatarPage, ProfilePage, SchedulePage } from '@pages/shared';
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
import store from '@app/providers/store';

const studentRouter = [
	{
		path: '/',
		element: <MainPage title="Главная страница" />,
		img: home,
		loader: () => {
			return { lessons };
		}
	},
	{
		path: '/train',
		element: <TrainPage title="Мои тренировки" />,
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
		element: <ExercisePage title="Мои занятия" />,
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
		element: <SchedulePage title="Расписание" />,
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
		element: <AvatarPage title="Изменить аватарку" />
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
	},
	{
		path: '/profile',
		element: <ProfilePage title="Мои личные данные" />,
		loader: () => {
			return store.getState().profile.profile;
		}
	}
];

export default studentRouter;
