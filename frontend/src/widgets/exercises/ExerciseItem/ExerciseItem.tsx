import styles from './ExerciseItem.module.scss';
import Checkbox from '../../../shared/ui/checkbox/Checkbox';

export default function ExerciseItem({ index, img, text, ...props} : any) {
	return (
		<li className={styles.component}>
			<div className={styles.number}>{index}</div>
			<div className={styles.icon_wrapper}>
				<img
					className={styles.icon}
					src={require(`../../../shared/assets/exercise/${img}.svg`)}
				/>
			</div>
			<span className={styles.text}>{text}</span>
			<Checkbox {...props} />
		</li>
	);
}
