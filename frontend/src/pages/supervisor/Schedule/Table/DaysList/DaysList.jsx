import styles from './DaysList.module.scss';
import classNames from 'classnames';
import { Button } from '../Button/Button';

export default function DaysList({ date, setModalActive }) {
	const data = Array(14).fill('');

	return (
		<ul className={classNames(styles.grid, styles.days)}>
			{data?.map((_, index) => (
				<li key={index} className={styles.day}>
					{date.clone().add(index, 'days').format('D')}
					<Button
						className={styles.add_btn}
						onclick={() => {
							setModalActive(date.clone().add(index, 'days').format('D'));
						}}
					/>
				</li>
			))}
		</ul>
	);
}
