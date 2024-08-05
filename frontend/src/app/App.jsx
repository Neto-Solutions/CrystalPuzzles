import styles from './App.module.scss';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@widgets/header';
import Sidebar from '@widgets/sidebar';
import { Footer } from '@widgets/footer';
import { Spinner } from '@shared/ui';
import { NotificationModal } from '../shared/ui/popups/NotificationModal/NotificationModal';
import { useSelector } from 'react-redux';
import { selectUser } from '@entities/user';

export default function App() {
	const { role } = useSelector(selectUser);
	const [notification, setNotification] = useState(false);

	return (
		<>
			{!role && notification && (
				<NotificationModal onHide={() => setNotification(false)} />
			)}
			<div className={styles.container}>
				<Header />
				<Spinner isLoading={role ? false : true}>
					<div className={styles.app}>
						<Sidebar />
						<div className={styles.page}>
							<Outlet />
						</div>
					</div>
					<Footer />
				</Spinner>
			</div>
		</>
	);
}
