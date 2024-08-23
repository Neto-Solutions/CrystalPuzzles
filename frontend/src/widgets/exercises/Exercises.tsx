import styles from './Exercises.module.scss';
import ExerciseItem from './ExerciseItem/ExerciseItem';

export default function Exercises({ data, className, disabled, checked }: any) {
	return (
		<ul className={styles.list + ' ' + className}>
			{data?.map((item: any, index: number) => (
				<ExerciseItem
					key={item._id}
					id={item._id}
					index={index + 1}
					img={item.img}
					text={item.name}
					checked={checked && item.isComplete}
					disabled={disabled}
				/>
			))}
		</ul>
	);
}
