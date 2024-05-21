import styles from './Progress.graph.view.page.module.scss';
import Page from '@components/page/Page';
import UserCard from '@components/card/user.card/User.card';
import Button from '@components/button/Button';
import avatar from '@assets/img/methodist_img.jpg';
import CalendarButton from '@components/button/calendar';
import { Graph } from '../../components/graph/Graph';
import Title from '../../components/title/Title';

const data = [
	{
		id: 'занятия с группой',
		color: 'hsl(196, 60%, 77%)',
		data: [
			{
				x: 'январь',
				y: 4
			},
			{
				x: 'февраль',
				y: 2
			},
			{
				x: 'март',
				y: 2.6
			},
			{
				x: 'апрель',
				y: 3.1
			},
			{
				x: 'май',
				y: 2
			},
			{
				x: 'июнь',
				y: 1
			},
			{
				x: 'июль',
				y: 1
			},
			{
				x: 'август',
				y: 1.5
			},
			{
				x: 'сентябрь',
				y: 4.8
			},
			{
				x: 'октябрь',
				y: 1.8
			},
			{
				x: 'ноябрь',
				y: 2.7
			},
			{
				x: 'декабрь',
				y: 3.5
			}
		]
	},
	{
		id: 'индивидуальные занятия',
		color: 'hsl(239, 79%, 26%)',
		data: [
			{
				x: 'январь',
				y: 0.4
			},
			{
				x: 'февраль',
				y: 2
			},
			{
				x: 'март',
				y: 7
			},
			{
				x: 'апрель',
				y: 1.7
			},
			{
				x: 'май',
				y: 1.2
			},
			{
				x: 'июнь',
				y: 5.1
			},
			{
				x: 'июль',
				y: 3
			},
			{
				x: 'август',
				y: 3
			},
			{
				x: 'сентябрь',
				y: 1.3
			},
			{
				x: 'октябрь',
				y: 2
			},
			{
				x: 'ноябрь',
				y: 1.5
			},
			{
				x: 'декабрь',
				y: 6
			}
		]
	}
];

export default function ProgressGraphViewPage() {
	return (
		<Page title="График прогресса">
			<div className={styles.chart}>
				<Title tag="h2">График развития</Title>
				<div className={styles.point_wrap}>
					<div>
						<div className={`${styles.point} ${styles.point_group}`}></div>
						<span className={styles.text}>занятие с группой</span>
					</div>
					<div>
						<div className={`${styles.point} ${styles.point_private}`}></div>
						<span className={styles.text}>индивидуальные занятия</span>
					</div>
				</div>
				<Graph data={data} />
			</div>
			<div className={styles.buttons_container}>
				<UserCard img={avatar} name="Дмитриева Анастасия Алексеевна" />

				<CalendarButton />
				<Button title="Выгрузить" />
				<Button title="Открыть в Google doc" />
			</div>
		</Page>
	);
}
