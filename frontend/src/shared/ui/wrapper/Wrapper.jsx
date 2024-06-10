import styles from './Wrapper.module.scss';

export default function Wrapper({ children, width, max_width }) {
	return (
		<>
			<div
				className={styles.body}
				style={{
					width,
					maxWidth: max_width
				}}
			>
				{children}
			</div>
		</>
	);
}
