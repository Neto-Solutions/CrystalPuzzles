import styles from './Page.module.scss';
import Spinner from '../spinner/Spinner';

export default function Page({ title, children, isLoading = false }) {
	return (
		<Spinner isLoading={isLoading}>
			{title && (
				<>
					<header className={styles.header}>
						<h1 className={styles.header_title}>{title}</h1>
					</header>
				</>
			)}
			<main className={styles.body}>{children}</main>
		</Spinner>
	);
}
