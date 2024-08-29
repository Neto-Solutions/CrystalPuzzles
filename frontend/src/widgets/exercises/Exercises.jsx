import classNames from 'classnames';
import ExerciseItem from './ExerciseItem/ExerciseItem';
import styles from './Exercises.module.scss';

export default function Exercises({ data, className, disabled, checked }) {
	return (
		<ul className={classNames(styles.list, className)}>
			{data?.map((item, index) => (
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
