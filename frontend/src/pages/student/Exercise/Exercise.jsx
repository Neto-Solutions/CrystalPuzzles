import styles from './Exercise.module.scss';
import { Page } from '@shared/ui';
import { DateChanger } from '../../../features/DateChanger/DateChanger';
import exerciseOneIcon from '../../../shared/assets/exercise/1.svg';
import ExerciseItem from '../../../shared/ui/ExerciseItem/ExerciseItem';

export default function ExercisePage() {
	const tempArray = Array.from({ length: 6 }, () => 1);
	return (
		<Page title="Мои занятия">
			<div className={styles.container}>
				<DateChanger className={styles.date} />
				<ul className={styles.list}>
					{tempArray.map((item, index) => (
						<ExerciseItem
							key={item}
							text={'какое-то упражнение'}
							id={index + 1}
							img={exerciseOneIcon}
						/>
					))}
				</ul>
			</div>
		</Page>
	);
}
