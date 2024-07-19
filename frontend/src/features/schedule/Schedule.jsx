import styles from './Schedule.module.scss';
import { useState } from 'react';

export default function Schedule() {
	const [data] = useState(Array(3).fill(1));
	return (
		<>
			{data.map((_, index) => (
				<div key={index} className={styles.item_container}>
					<div className={styles.item}>
						<p className={styles.content}>
							<span className={styles.time}>17/10</span> площадка номер 1{' '}
							<span className={styles.time}>14:00</span> _ 5 группа, тренер
							Дмитриева А.
						</p>
					</div>
				</div>
			))}
		</>
	);
}
