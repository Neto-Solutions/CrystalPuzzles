import { ReactComponent as CheckedIcon } from '@shared/assets/svg/checked.svg';
import styles from './Checkbox.module.scss';

export default function Checkbox({ id, ...props} : any) {
	return (
		<label className={styles.label} htmlFor={id}>
			<input type="checkbox" className={styles.checkbox} id={id} {...props} />
			<CheckedIcon className={styles.icon} />
		</label>
	);
}
