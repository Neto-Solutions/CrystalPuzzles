import styles from './ExerciseItem.module.scss';
import snowflake from '../../../shared/assets/svg/snowflake.svg';
import Checkbox from '@shared/ui/checkbox/Checkbox';

export default function ExerciseItem({ index, img, text, ...props }: any) {
	return (
		<li className={styles.component}>
			<div className={styles.number}>{index}</div>
			<div className={styles.icon_wrapper}>
				<img
					className={styles.icon}
					// src={require(`../../../shared/assets/exercise/${img}.svg`)}
					src={snowflake}
				/>
			</div>
			<span className={styles.text}>{text}</span>
			<Checkbox {...props} />
		</li>
	);
}
