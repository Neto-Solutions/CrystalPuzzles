import styles from './Exercise.module.scss';
import { Page } from '@shared/ui';

export default function ExercisePage() {
	const tempArray = Array.from({ length: 6 }, () => 1);
	return (
		<Page title="Мои занятия">
			<div className={styles.container}>
				<div className={styles.date_picker}>
					{new Date().toLocaleDateString()}
				</div>
				<ul className={styles.list}>
					{tempArray.map((item, index) => (
						<li key={index} className={styles.item}>
							<div className={styles.number}>{index + 1}</div>
							<img className={styles.img} />
							<span className={styles.text}>{item}</span>
							<input className={styles.checkbox} type="checkbox" />
						</li>
					))}
				</ul>
			</div>
		</Page>
	);
}
