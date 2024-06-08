import styles from './Wrapper.module.scss';
import { Header } from '@widgets/header';
export default function Wrapper({ children }) {
	return (
		<div className={styles.container}>
			<Header check_in />
			<div className={styles.content}>{children}</div>
		</div>
	);
}
