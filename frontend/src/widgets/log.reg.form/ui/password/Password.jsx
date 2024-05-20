import Input from '../input/Input';
import styles from './styles.module.scss';
import { ReactComponent as Eye } from '@shared/assets/svg/eye_icon.svg';
export default function Password() {
	return (
		<Input label="Пароль" dataKey="password" type="password" required>
			<Eye className={styles.input_password_eye} />
		</Input>
	);
}
