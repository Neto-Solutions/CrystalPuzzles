import styles from './Survey.module.scss';
import { Page } from '@shared/ui';
import { ReactComponent as File } from '@shared/assets/svg/file.svg';

export default function SurveyPage() {
	return (
		<Page title="Анкета">
			<div className={styles.section}>
				<div className={styles.wrapper}>
					<div>Обязательная анкета при регистрации</div>
					<a
						href="https://docs.google.com/forms/d/e/1FAIpQLSdCGs_DESUy6-54JndkXfK9qySF72FDP8gwZC-v7kEoMu6zHA/viewform"
						target="_blank"
						rel="noreferrer"
						className={styles.link}
					>
						<File />
						<span>Pdf</span>
					</a>
				</div>
			</div>
			{/* <div className={styles.section}>
				<div className={styles.wrapper}>
					<div>Обязательная анкета при регистрации</div>
					<a href="" target="_blank" rel="noreferrer" className={styles.link}>
						<File />
						<span>Pdf</span>
					</a>
				</div>
			</div> */}
		</Page>
	);
}
