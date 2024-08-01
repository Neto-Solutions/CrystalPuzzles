import styles from './Exercises.module.scss';
import { useState, useEffect } from 'react';
import ExerciseItem from '@shared/ui/ExerciseItem/ExerciseItem';
import { getExercises } from '@entities/exercise/api';
import { updateData } from '../../../../entities/lesson/api/lesson';

export default function Exercises({ className, formId, lessonId, ...props }) {
	const [exercises, setExercises] = useState([]);
	useEffect(() => {
		getExercises().then(setExercises);
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		let result = [];
		for (const el of e.target) {
			if (!el.id) continue;
			if (el.checked) {
				result.push({
					id: el.id,
					isComplete: false
				});
			}
		}
		updateData(lessonId, { exercises: result });
	}

	return (
		<section className={styles.exercises_container + ' ' + className}>
			<form onSubmit={handleSubmit} id={formId} className={styles.exercises}>
				<ul className={styles.list}>
					{exercises?.map((item, index) => (
						<ExerciseItem
							key={item._id}
							id={item._id}
							index={index + 1}
							img={item.img}
							text={item.name}
							defaultChecked={item.isComplete}
							{...props}
						/>
					))}
				</ul>
			</form>
		</section>
	);
}
