import styles from './Survey.module.scss';
import { Page } from '@shared/ui';
import { ReactComponent as File } from '@shared/assets/svg/file.svg';

interface SurveyPageProps {
	title: string;
}

export default function SurveyPage({ title }: SurveyPageProps) {
	return (
		<Page title={title}>
			<div className={styles.section}>
				<div className={styles.wrapper}>
					<div>Анкета участника</div>
					<a
						href="https://docs.google.com/forms/d/e/1FAIpQLSdrCo2mAVH_A5V_m3FCly2DN3oP54ajGUMzvLFZWTeVc1klxQ/viewform"
						target="_blank"
						rel="noreferrer"
						className={styles.link}
					>
						<File />
						<span>Pdf</span>
					</a>
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.wrapper}>
					<div>Анкета родителя</div>
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
		</Page>
	);
}
