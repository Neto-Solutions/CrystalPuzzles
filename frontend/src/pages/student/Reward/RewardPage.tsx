import classNames from 'classnames';
import { Page, Title } from '@shared/ui';
import gold from './assets/gold.svg';
import silver from './assets/silver.svg';
import bronze from './assets/bronze.svg';
import styles from './RewardPage.module.scss';

interface RewardPageProps {
	title: string;
}

export const RewardPage = ({ title }: RewardPageProps) => {
	//TODO: рефактор этого ужаса!!!
	return (
		<Page title={title}>
			<section className={styles.component}>
				<div className={styles.wrapper}>
					<Title tag="h2">Первый учебный год:</Title>
					<div className={styles.revard_wrapper}>
						<img src={gold} className={classNames(styles.img, styles.active)} />
						<img src={silver} className={styles.img} />
						<img src={bronze} className={styles.img} />
					</div>
				</div>

				<div className={styles.wrapper}>
					<Title tag="h2">Второй учебный год:</Title>
					<div className={styles.revard_wrapper}>
						<img src={gold} className={styles.img} />
						<img src={silver} className={styles.img} />
						<img src={bronze} className={styles.img} />
					</div>
				</div>
			</section>
		</Page>
	);
};
