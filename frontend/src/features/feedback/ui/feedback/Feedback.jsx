import styles from './Feedback.module.scss';
export default function Feedback({ placeholder, children }) {
	return (
		<div className={styles.container}>
			<div className={styles.textarea_container}>
				<div className={styles.title}>{children}</div>
				<textarea
					className={styles.textarea}
					name=""
					id=""
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
}
