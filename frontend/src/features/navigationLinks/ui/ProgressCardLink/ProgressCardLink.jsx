import { CardLink } from '@shared/ui/card';
import styles from './ProgressCardLink.module.scss';

export const ProgressCardLink = () => {
	return (
		<CardLink
			to="/progress"
			title="Графики прогресса"
			className={styles.progress_graph}
		/>
	);
}
