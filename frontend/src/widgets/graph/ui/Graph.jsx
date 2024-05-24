import { ResponsiveLine } from '@nivo/line';
import styles from './Graph.module.scss';
import Title from '@shared/ui/title/Title';

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

export const Graph = () => {
	return (
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
			<ResponsiveLine
				data={data}
				margin={{ top: 20, right: 25, bottom: 90, left: 28 }}
				xScale={{ type: 'point' }}
				yScale={{
					type: 'linear',
					min: 0,
					max: 10,
					stacked: false,
					reverse: false
				}}
				colors={{ datum: 'color' }}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize: 0,
					tickPadding: 25,
					tickRotation: 0,
					legend: '',
					legendOffset: 36,
					legendPosition: 'start',
					truncateTickAt: 0
				}}
				axisLeft={{
					tickSize: 0,
					tickPadding: 15,
					tickRotation: 0,
					legend: '',
					legendOffset: -40,
					legendPosition: 'middle',
					truncateTickAt: 0
				}}
				pointSize={7}
				pointBorderWidth={2}
				pointLabel="data.yFormatted"
				pointLabelYOffset={-12}
				useMesh={true}
				enableCrosshair={false}
				enableGridX={false}
				gridYValues={3}
			/>
		</div>
	);
};
