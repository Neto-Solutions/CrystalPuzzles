import styles from './Input.module.scss';
export default function Input({ label, dataKey, type, required, children }) {
	return (
		<div className={styles.container}>
			{label && <label className={styles.label}>{label}</label>}
			<input
				className={styles.input}
				data-key={dataKey}
				type={type}
				required={required}
			/>
			{children}
		</div>
	);
}
