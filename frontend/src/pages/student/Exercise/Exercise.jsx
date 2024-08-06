import useResize from '@shared/hooks/useResize';
import { Page } from '@shared/ui';
import { DateChanger } from '@features/DateChanger/DateChanger';
import ExerciseItem from '@shared/ui/ExerciseItem/ExerciseItem';
import styles from './Exercise.module.scss';
import { useLoaderData } from 'react-router-dom';

export default function ExercisePage() {
	const data = useLoaderData();
	const isTablet = useResize('md');

	return (
		<Page title="Мои занятия">
			{isTablet ? (
				<>
					<DateChanger className={styles.date} />
					<div className={styles.container}>
						<div className={styles.reward_wrapper}>
							<span>Мои награды</span>
						</div>
						<ul className={styles.list}>
							{data &&
								data.exercises.map((item, index) => (
									<ExerciseItem
										key={item._id}
										text={item.name}
										id={index + 1}
										img={item.img}
										defaultChecked={item.isComplete}
									/>
								))}
						</ul>
					</div>
				</>
			) : (
				<div className={styles.container}>
					<div>
						<DateChanger className={styles.date} />
						<ul className={styles.list}>
							{data &&
								data.exercises.map((item, index) => (
									<ExerciseItem
										key={item._id}
										text={item.name}
										id={index + 1}
										img={item.img}
										defaultChecked={item.isComplete}
									/>
								))}
						</ul>
					</div>
					<div className={styles.reward_wrapper}>
						<span>Мои награды</span>
					</div>
				</div>
			)}
		</Page>
	);
}
