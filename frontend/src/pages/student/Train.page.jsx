import styles from './Train.page.module.scss';
import Page from '@shared/ui/page/Page';
import { Link } from 'react-router-dom';
export default function TrainPage() {
	const tempArray = Array.from({ length: 3 }, () => ({
		name: 'Дмитриева Анастасия Алексеевна',
		trainer: 'Анастасия',
		combination: '(жетон 1)',
		date: '12/11/22'
	}));
	return (
		<Page title="Тренировки">
			{tempArray.map((item, index) => {
				return (
					<Link to="/feedback" key={index} className={styles.card}>
						<div className={styles.info}>
							<div className={styles.name}>{item.name}</div>
							<div className={styles.trainer}>
								<span className={styles.trainer_title}>Тренер:</span>
								{item.trainer}
							</div>
							<div className={styles.combination}>
								<span className={styles.combination_title}>Комбинация 1</span>
								{item.combination}
							</div>
						</div>
						<div className={styles.date}>{item.date}</div>
					</Link>
				);
			})}
		</Page>
	);
}
