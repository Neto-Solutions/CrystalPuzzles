import styles from './Exercises.module.scss';
import { useState, useEffect } from 'react';
import ExerciseItem from '@shared/ui/ExerciseItem/ExerciseItem';
import { getExercises } from '@entities/exercise/api';

export default function Exercises({ className }) {
	const [exercises, setExercises] = useState([]);
	useEffect(() => {
		getExercises().then(setExercises);
	}, []);
	return (
		<section className={styles.exercises_container + ' ' + className}>
			<ul className={styles.list}>
				{exercises?.map((item, index) => (
					<ExerciseItem
						key={item._id}
						text={item.name}
						id={index + 1}
						img={item.img}
						defaultChecked={item.isComplete}
					/>
				))}
			</ul>
		</section>
	);
}
