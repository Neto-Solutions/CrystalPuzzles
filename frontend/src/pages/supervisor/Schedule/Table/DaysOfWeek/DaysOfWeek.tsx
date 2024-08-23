import styles from './DaysOfWeek.module.scss';
import moment from 'moment';
import 'moment/locale/ru';
import classNames from 'classnames';

export default function DaysOfWeek() {
	window.moment = moment;
	moment.updateLocale('ru', { week: { dow: 1 } });
	const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

	return (
		<ul className={classNames(styles.grid, styles.weeks)}>
			{daysOfWeek.map((item) => (
				<li key={item} className={styles.week}>
					{item}
				</li>
			))}
		</ul>
	);
}
