import { Page } from '@shared/ui';
import styles from './RewardPage.module.scss';

interface RewardPageProps {
	title: string;
}

export const RewardPage = ({ title }: RewardPageProps) => {
	return (
		<Page title={title}>
			<div className={styles.container}>
				<h1>TODO: ждём дизайн</h1>
			</div>
		</Page>
	);
};
