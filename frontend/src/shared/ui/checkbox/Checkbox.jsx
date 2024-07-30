import React from 'react';
import { ReactComponent as CheckedIcon } from '../../../shared/assets/svg/checked.svg';
import styles from './Checkbox.module.scss';

export default function Checkbox({ defaultChecked, disabled }) {
	return (
		<label className={styles.label} htmlFor="input">
			<input
				className={styles.checkbox}
				id="input"
				type="checkbox"
				defaultChecked={defaultChecked}
				disabled={disabled}
			/>

			<CheckedIcon className={styles.input_icon} />
		</label>
	);
}
