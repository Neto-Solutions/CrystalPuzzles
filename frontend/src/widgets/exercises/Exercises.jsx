import styles from './Exercises.module.scss';
import ExerciseItem from './ExerciseItem/ExerciseItem';

export default function Exercises({ data, className, disabled }) {
	return (
		<ul className={styles.list + ' ' + className}>
			{data?.map((item, index) => (
				<ExerciseItem
					key={item._id}
					id={item._id}
					index={index + 1}
					img={item.img}
					text={item.name}
					checked={item.isComplete}
					disabled={disabled}
				/>
			))}
		</ul>
	);
}
