import styles from './ChangePass.module.scss';
import { useState } from 'react';

export default function ChangePass() {
	const [data, setData] = useState();

	return (
		<div className={styles.container}>
			<div className={styles.content}>ChangePass</div>
		</div>
	);
}
