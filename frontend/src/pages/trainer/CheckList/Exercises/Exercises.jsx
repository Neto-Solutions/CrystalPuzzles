import styles from './Exercises.module.scss';
import ExerciseItem from '@shared/ui/ExerciseItem/ExerciseItem';
import { useLoaderData } from 'react-router-dom';

export default function Exercises({ className, formId, ...props }) {
	const exercises = useLoaderData();

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
