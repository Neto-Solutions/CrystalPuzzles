import styles from './App.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Header } from '@widgets/header';
import Sidebar from '@widgets/sidebar';
import { Footer } from '@widgets/footer';
import { Spinner } from '@shared/ui';
import { User, setUser, getProfile } from '@entities/user';

export default function App() {
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		getProfile()
			.then((res) => dispatch(setUser(new User(res))))
			.catch(() => navigate('/login'))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className={styles.container}>
			<Header />
			<Spinner isLoading={loading}>
				<div className={styles.app}>
					<Sidebar />
					<div className={styles.page}>
						<Outlet />
					</div>
				</div>
				<Footer />
			</Spinner>
		</div>



	);
}
