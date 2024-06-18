import styles from './Policy.module.scss';

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
				<a
					href="https://drive.google.com/file/d/1oU3TamtASCI3z2CN6RNhO2sCJye0mk8N/view?usp=drive_link"
					target="_blank"
					className={styles.politic_link}
					rel="noopener noreferrer"
				>
					{' '}
					политикой конфиденциальности
				</a>
			</label>
		</div>
	);
}
