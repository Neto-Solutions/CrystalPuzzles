import { Page } from '@shared/ui';
import { ReactComponent as File } from '@shared/assets/svg/file.svg';
import styles from './SurveyPage.module.scss';

export default function SurveyPage() {
	return (
		<Page title="Анкета">
			<div className={styles.section}>
				<div className={styles.wrapper}>
					<div>Обязательная анкета при регистрации</div>
					<a href="#" target="_blank" className={styles.link}>
						<File />
						<span>Pdf</span>
					</a>
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.wrapper}>
					<div>Обязательная анкета при регистрации</div>
					<a href="#" target="_blank" className={styles.link}>
						<File />
						<span>Pdf</span>
					</a>
				</div>
			</div>
		</Page>
	);
}
