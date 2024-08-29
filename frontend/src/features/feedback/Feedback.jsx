import styles from './Feedback.module.scss';
export default function Feedback({ placeholder, title, className }) {
	return (
		<div className={styles.container + ' ' + className}>
			<div className={styles.textarea_container}>
				<div className={styles.title}>{title}</div>
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
