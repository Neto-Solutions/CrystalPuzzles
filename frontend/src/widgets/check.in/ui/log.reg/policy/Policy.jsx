import styles from './Policy.module.scss';
import { Link } from 'react-router-dom';

export default function Policy() {
	return (
		<div className={styles.container}>
			<input
				id="checkbox"
				className={styles.checkbox}
				data-key="checkbox"
				type="checkbox"
				required
			/>
			<label className={styles.label} htmlFor="checkbox">
				Подтверждая, вы соглашаетесь на обработку персональных данных и c
				<Link to="/politics" className={styles.politic_link}>
					{' '}
					политикой конфиденциальности
				</Link>
			</label>
		</div>
	);
}
