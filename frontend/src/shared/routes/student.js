import { AvatarPage, SchedulePage } from '@pages/shared';
import { MainPage, ExercisePage, TrainPage, SurveyPage } from '@student';
import training from 'assets/svg/sidebar/Training.svg';
import schedule from 'assets/svg/sidebar/schedule.svg';
import home from 'assets/svg/sidebar/home.svg';
import { Lesson, CheckList } from '../api';

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
		path: '/train/:id',
		element: <ExercisePage />,
		loader: async ({ params }) => {
			const checkList = await CheckList.get({ lessonId: params.id });
			const lesson = await Lesson.getById({ id: params.id });
			return { checkList, lesson };
		}
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
