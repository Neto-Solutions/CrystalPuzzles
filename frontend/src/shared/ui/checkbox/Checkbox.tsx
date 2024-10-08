import { ReactComponent as CheckedIcon } from '@shared/assets/svg/checked.svg';
import { v4 as uuid } from 'uuid';
import styles from './Checkbox.module.scss';

interface CheckboxProps {
	id: number;
	checked?: boolean;
	disabled?: boolean;
}

export default function Checkbox({ id, checked, disabled }: CheckboxProps) {
	const inputId = uuid();
	return (
		<label className={styles.label} htmlFor={inputId}>
			<input
				type="checkbox"
				id={inputId}
				value={id}
				className={styles.checkbox}
				checked={checked}
				disabled={disabled}
			/>
			<CheckedIcon className={styles.icon} />
		</label>
	);
}
