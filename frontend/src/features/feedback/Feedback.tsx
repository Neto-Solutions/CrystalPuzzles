import styles from './Feedback.module.scss';

interface FeedbackProps {
	placeholder?: string;
	title?: string;
	className?: string;
}
export default function Feedback({
	placeholder,
	title,
	className
}: FeedbackProps) {
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
