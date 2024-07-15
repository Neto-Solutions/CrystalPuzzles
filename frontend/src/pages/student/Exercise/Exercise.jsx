import styles from './Exercise.module.scss';
import { Page } from '@shared/ui';

export default function ExercisePage() {
	const tempArray = Array.from({ length: 6 }, () => 1);
	return (
		<Page title="Мои занятия">
			<div className={styles.container}>
				<div className={styles.header}>Чек-листы</div>
				<ul className={styles.list}>
					{tempArray.map((item, index) => (
						<li key={index} className={styles.list_item}>
							<span className={styles.list_item_title}>{item} уровень</span>
							<input className={styles.list_item_checkbox} type="checkbox" />
						</li>
					))}
				</ul>
			</div>
		</Page>
	);
}
