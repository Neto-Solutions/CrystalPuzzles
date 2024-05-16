import './styles/index.scss';
import styles from './App.module.scss';
import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@entities/User/slice';
import { useState } from 'react';
import ComponentLoading from '../shared/Component.loading';
import { getProfile } from '@api/profile.api';
import { setUser } from '@entities/User/slice';
import User from '@entities/User';
import { updateToken } from '../api/auth.api';

export default function App({ check_in = false }) {
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { role } = useSelector(selectUser);

	useEffect(() => {
		getProfile()
			.then((res) => dispatch(setUser(new User(res))))
			.catch(() => navigate('/login'))
			.finally(() => setLoading(false));
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
