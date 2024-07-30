import { useEffect, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { ReactComponent as Arrow } from '@shared/assets/svg/circle_arrow.svg';
import styles from './DateChanger.module.scss';

export const DateChanger = ({ className, day }) => {
	const [date, setDate] = useState(moment().startOf('month'));

	useEffect(() => {
		setDate((prev) => prev.clone().add(day, 'days').subtract(1, 'days'));
	}, []);

	return (
		<header className={classNames(styles.top, className)}>
			<button
				className={styles.arrow_btn}
				onClick={() => setDate((prev) => prev.clone().subtract(1, 'days'))}
			>
				<Arrow className={styles.arrow} />
			</button>
			<h3 className={styles.month_title}>{date.format('ll')}</h3>
			<button
				className={styles.arrow_btn}
				onClick={() => setDate((prev) => prev.clone().add(1, 'days'))}
			>
				<Arrow className={classNames(styles.arrow, styles.arrow_rotation)} />
			</button>
		</header>
	);
};
