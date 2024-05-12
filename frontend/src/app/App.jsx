import './styles/index.scss';
import styles from './App.module.scss';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Header from '@components/app/header/Header';
import Sidebar from '@components/app/sidebar/Sidebar';
// import RouterTool from '@utils/Router.tool';
import Footer from '../components/app/footer/Footer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function App({ check_in = false }) {
	const navigate = useNavigate();
	const role = useSelector((state) => state.user.role);
	useEffect(() => {
		role !== undefined && navigate('/');
	}, [role]);

	return (
		<div className={styles.app}>
			{/* <RouterTool /> */}
			<Header />
			<Suspense fallback={<div>Loading...</div>}>
				<div className={styles.page_container}>
					{check_in ? (
						<>
							<Outlet />
						</>
					) : (
						<>
							<Sidebar />
							<div className={styles.page}>
								<Outlet />
							</div>
						</>
					)}
				</div>
			</Suspense>
			{!check_in && <Footer />}
		</div>
	);
}
