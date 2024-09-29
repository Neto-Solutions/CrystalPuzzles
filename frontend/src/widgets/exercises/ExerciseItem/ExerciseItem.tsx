import snowflake from '@shared/assets/svg/snowflake2.svg';
import Checkbox from '@shared/ui/checkbox/Checkbox';
import styles from './ExerciseItem.module.scss';

interface ExerciseItemProps {
	index: number;
	text: string;
	id: number;
	checked?: boolean;
	disabled?: boolean;
}

export default function ExerciseItem({
	index,
	text,
	id,
	checked,
	disabled
}: ExerciseItemProps) {
	return (
		<li className={styles.component}>
			<div className={styles.number}>{index}</div>
			<div className={styles.icon_wrapper}>
				<img className={styles.icon} src={snowflake} />
			</div>
			<span className={styles.text}>{text}</span>
			<Checkbox id={id} checked={checked} disabled={disabled} />
		</li>
	);
}
