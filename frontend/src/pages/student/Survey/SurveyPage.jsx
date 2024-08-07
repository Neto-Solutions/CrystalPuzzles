import { Page } from '@shared/ui';
import { ReactComponent as File } from '@shared/assets/svg/file.svg';
import styles from './SurveyPage.module.scss';

export default function SurveyPage() {
	return (
		<Page title="Анкета">
			<div className={styles.section}>
				<div className={styles.wrapper}>
					<div>Обязательная анкета при регистрации</div>
					<button className={styles.btn} onClick={() => console.log('file')}>
						<File />
						<span>Pdf</span>
					</button>
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.wrapper}>
					<div>Обязательная анкета при регистрации</div>
					<button className={styles.btn} onClick={() => console.log('file')}>
						<File />
						<span>Pdf</span>
					</button>
				</div>
			</div>
		</Page>
	);
}
