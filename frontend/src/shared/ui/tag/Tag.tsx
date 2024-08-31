import styles from './Tag.module.scss';
import { createPortal } from 'react-dom';

declare global {
	interface Window {
		TAG: string;
	}
}

export default function Tag() {
	const tag = process.env.REACT_APP_TAG || window.TAG;
	return createPortal(
		<div className={styles.container}>
			<div className={styles.tag}>{tag}</div>
		</div>,
		document.getElementById('tag') as HTMLElement
	);
}
