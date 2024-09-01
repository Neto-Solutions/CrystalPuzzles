import { Page } from '@shared/ui';
import { Notification } from '@widgets';

interface NotificationPageProps {
	title: string;
}

export default function NotificationPage({ title }: NotificationPageProps) {
	return (
		<Page title={title}>
			<Notification array={Array(6).fill('')} isPage />
		</Page>
	);
}
