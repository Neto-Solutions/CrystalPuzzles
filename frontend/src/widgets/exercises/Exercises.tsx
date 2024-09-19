import classNames from 'classnames';
import ExerciseItem from './ExerciseItem/ExerciseItem';
import styles from './Exercises.module.scss';
import { useEffect, useState } from 'react';
import { Exercise } from '@shared/api';
import { v4 as uuid } from 'uuid';

export default function Exercises({ data, className, disabled, checked }: any) {
	const [exercises, setExercises] = useState(data);

	useEffect(() => {
		if (data) return;
		Exercise.get().then(setExercises).catch();
	}, []);

	return (
		<ul className={classNames(styles.list, className)}>
			{exercises?.map((item: any, index: number) => (
				<ExerciseItem
					key={uuid()}
					id={item.id}
					index={index + 1}
					text={item.name}
					checked={checked && item.isComplete}
					disabled={disabled}
				/>
			))}
		</ul>
	);
}
