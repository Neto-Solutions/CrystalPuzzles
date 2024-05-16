import styles from './App.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from '@widgets/header/Header';
import Sidebar from '@widgets/sidebar/Sidebar';
import Footer from '@widgets/footer/Footer';

import ComponentLoading from '@shared/ui/Component.loading';

import { User, setUser, selectUser } from '@entities/user';
import { updateToken } from '../api/auth.api';

export default function App({ check_in = false }) {
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { role } = useSelector(selectUser);

	useEffect(() => {
		// getProfile()
		// 	.then((res) => dispatch(setUser(new User(res))))
		// 	.catch(() => navigate('/login'))
		// 	.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		if (role === undefined) return;
		updateToken().catch(() => null);
		navigate('/');
	}, [role]);

	return (
		<div className={styles.app}>
			{/* <RouterTool /> */}
			<Header />
			<ComponentLoading isLoading={loading}>
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
				{!check_in && <Footer />}
			</ComponentLoading>
		</div>
	);
}
