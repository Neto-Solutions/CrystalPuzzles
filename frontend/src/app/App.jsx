import styles from './App.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from '@widgets/header/Header';
import Sidebar from '@widgets/sidebar/Sidebar';
import Footer from '@widgets/footer/Footer';

import Spinner from '@shared/ui/spinner/Spinner';

import { User, setUser, selectUser, getProfile } from '@entities/user';

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
		if (role === null) return;
		navigate('/');
	}, [role]);

	return (
		<div className={styles.app}>
			<Header />
			<Spinner isLoading={loading}>
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
			</Spinner>
		</div>
	);
}
