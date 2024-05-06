import styles from './App.module.scss';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Header from '@components/app/header/Header';
import Sidebar from '@components/app/sidebar/Sidebar';
import RouterTool from '@utils/Router.tool';

export default function App({ sidebar = false }) {
	return (
		<div className={styles.app}>
			<RouterTool />
			<Header />
			<Suspense fallback={<div>Loading...</div>}>
				<div className={styles.page_container}>
					{sidebar ? (
						<>
							<Sidebar />
							<div className={styles.page}>
								<Outlet />
							</div>
						</>
					) : (
						<>
							<Outlet />
						</>
					)}
				</div>
			</Suspense>
		</div>
	);
}
