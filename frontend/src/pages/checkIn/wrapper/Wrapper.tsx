import styles from './Wrapper.module.scss';
import { Header } from '@widgets';
export default function Wrapper({ children }: any) {
	return (
		<div className={styles.container}>
			<Header check_in />
			<div className={styles.content}>{children}</div>
		</div>
	);
}
