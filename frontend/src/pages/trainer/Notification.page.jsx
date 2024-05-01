import './Notification.page.scss';
import PageContainer from '@components/page.container/Page.container';
import Button from '@components/button/Button';
import Notification from '../../components/notification.block/Notification';

export default function NotificationPage() {
	return (
		<>
			<PageContainer.Header title="Уведомления" />
			<PageContainer.Body>
				<Notification array={Array(6).fill('')} isPage />
			</PageContainer.Body>
		</>
	);
}
