import snowflake from '@shared/assets/svg/snowflake2.svg';
import Checkbox from '@shared/ui/checkbox/Checkbox';
import styles from './ExerciseItem.module.scss';

export default function ExerciseItem({ index, text, ...props }: any) {
	return (
		<li className={styles.component}>
			<div className={styles.number}>{index}</div>
			<div className={styles.icon_wrapper}>
				<img className={styles.icon} src={snowflake} />
			</div>
			<span className={styles.text}>{text}</span>
			<Checkbox {...props} />
		</li>
	);
}
