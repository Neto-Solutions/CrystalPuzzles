import styles from './App.module.scss';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, Header, Footer } from '@widgets';
import { NotificationModal } from '@shared/ui';

export default function App() {
	const [notification, setNotification] = useState(false);
	return (
		<>
			{notification && (
				<NotificationModal onHide={() => setNotification(false)} />
			)}
			<div className={styles.container}>
				<Header />
				<div className={styles.app}>
					<Sidebar />
					<div className={styles.page}>
						<Outlet />
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}
