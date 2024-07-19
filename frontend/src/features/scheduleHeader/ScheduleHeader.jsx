import classNames from 'classnames';
import { ReactComponent as Arrow } from '@shared/assets/svg/circle_arrow.svg';
import styles from './ScheduleHeader.module.scss';

export const ScheduleHeader = ({
	onPrevClick,
	onNextClick,
	date,
	className
}) => {
	// TODO: доделать функциoнал
	return (
		<header className={classNames(styles.top, className)}>
			<button className={styles.arrow_btn} onClick={onPrevClick}>
				<Arrow className={styles.arrow} />
			</button>
			<h3 className={styles.month_title}>{date}</h3>
			<button className={styles.arrow_btn} onClick={onNextClick}>
				<Arrow className={classNames(styles.arrow, styles.arrow_rotation)} />
			</button>
		</header>
	);
};
