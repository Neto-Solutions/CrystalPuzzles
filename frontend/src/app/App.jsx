import styles from './App.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '@widgets/header';
import Sidebar from '@widgets/sidebar';
import { Footer } from '@widgets/footer';
import { Spinner } from '@shared/ui';
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
				<div className={styles.router_container}>
					{check_in ? (
						<>
							<Outlet />
						</>
					) : (
						<>
							<Sidebar />
							<div className={styles.page_container}>
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
