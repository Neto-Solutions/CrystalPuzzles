import { CardLink } from '@shared/ui/card';
import styles from './AnalyticCardLink.module.scss';

export const AnalyticCardLink = ({ className }: { className?: string }) => {
	return (
		<CardLink
			to="/analytic"
			title="Анализ эффективности"
			className={styles.analitic + ' ' + className}
		/>
	);
};
