import styles from './Сonfidentiality.page.module.scss';
import { Link } from 'react-router-dom';

export default function СonfidentialityPage() {
	return (
		<div className={styles.main_container}>
			<h1 className={styles.main_container_header}>
				Политика Конфиденциальности
			</h1>
			<form className={styles.form}>
				<label className={styles.data_treatment_cont}>
					<input className={styles.data_treatment_checkbox} type="checkbox" />
					<p className={styles.data_treatment_descr}>
						Согласие на обработку данных
					</p>
				</label>
				<label className={styles.politic_cont}>
					<input className={styles.politic_checkbox} type="checkbox" />
					<p className={styles.politic_descr}>Согласие с политикой компании </p>
				</label>
				<div className={styles.btn_cont}>
					<Link to="/" className={styles.btn}>
						Подтвердить
					</Link>
				</div>
			</form>
		</div>
	);
}
