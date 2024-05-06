import Page from '@components/page/Page';
// import { Link } from 'react-router-dom';
import Title from '../../components/title/Title';
import styles from './Notification.page.module.scss';
import Button from '../../components/button/Button';

export default function NotificationPage() {
	return (
		<Page title="Уведомления">
			<div className={styles.component}>
				<Title tag="h2" className={styles.heading}>
					Уведомления
				</Title>
				<div>
					{[...Array(5)].map((_, index) => (
						<div className={styles.item} key={index}>
							<div className={styles.desc}>Михаил выполнил все задания</div>
							<Button className={styles.btn}>Открыть</Button>
						</div>
					))}
				</div>
			</div>
		</Page>
	);
}
