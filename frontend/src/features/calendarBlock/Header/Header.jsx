import styles from './Header.module.scss';
import { ReactComponent as Arrow } from '@shared/assets/svg/small_arrow.svg';

export default function Header({ month, setMonth, onHide }) {
	const monthsOfYear = [
		'январь',
		'февраль',
		'март',
		'апрель',
		'май',
		'июнь',
		'июль',
		'август',
		'сентябрь',
		'октябрь',
		'ноябрь',
		'декабрь'
	];

	return (
		<div className={styles.container}>
			<div className={styles.date} onClick={onHide}>
				{monthsOfYear[month.month()] + ' ' + month.year()}
			</div>
			<div className={styles.btn_container}>
				<div
					className={styles.btn}
					onClick={() => {
						setMonth(month.clone().subtract(1, 'month'));
					}}
				>
					<Arrow />
				</div>
				<div
					className={styles.btn}
					onClick={() => {
						setMonth(month.clone().add(1, 'month'));
					}}
				>
					<Arrow className={styles.arrow} />
				</div>
			</div>
		</div>
	);
}
