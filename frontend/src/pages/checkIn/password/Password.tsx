import styles from './Password.module.scss';
import Input from '../input/Input';
import { ReactComponent as Eye } from '@shared/assets/svg/eye_icon.svg';
import { ReactComponent as CrossEye } from '@shared/assets/svg/cross_eye.svg';
import { useState } from 'react';

export default function Password({
	title = 'Пароль',
	dataKey = 'password'
}: any) {
	const [openEye, setOpenEye]: any = useState(true);

	return (
		<Input
			label={title}
			dataKey={dataKey}
			type={openEye ? 'password' : 'text'}
			required
		>
			{openEye ? (
				<Eye
					onClick={() => {
						setOpenEye(!openEye);
					}}
					className={styles.input_password_eye}
				/>
			) : (
				<CrossEye
					onClick={() => {
						setOpenEye(!openEye);
					}}
					className={styles.input_password_eye}
				/>
			)}
		</Input>
	);
}
