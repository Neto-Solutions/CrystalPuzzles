import styles from './Page.module.scss';

export default function Page({ title, children }) {
	return (
		<>
			{title && (
				<>
					<header className={styles.header}>
						<h1 className={styles.header_title}>{title}</h1>
					</header>
				</>
			)}
			<main className={styles.body}>{children}</main>
		</>
	);
}
