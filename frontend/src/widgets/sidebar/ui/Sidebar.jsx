import styles from './Sidebar.module.scss';

import help from '@shared/assets/svg/help_icon.svg';
import exit from '@shared/assets/svg/exit_icon.svg';
import { Link } from 'react-router-dom';
import { NavMenuList } from './NavMenu';
import { Account } from '@entities/user/ui/Account';
import { useSelector } from 'react-redux';
import { selectUser, logout } from '@entities/user';
import Cookies from 'js-cookie';

export default function Sidebar() {
	const user = useSelector(selectUser);

	async function handleExit() {
		await logout()
			.then(() => {
				Cookies.remove('token');
				location.reload();
			})
			.catch(() => location.reload());
	}

	return (
		<aside className={styles.sidebar}>
			<Account user={user} />
			<div className={styles.line}></div>
			<NavMenuList role={user.role} />
			<div className={styles.line}></div>
			<div className={styles.links}>
				<Link to="./#" className={`${styles.sidebar_link} ${styles.help}`}>
					<img src={help} className={styles.link_icon} alt="" />
					<span>Помощь</span>
				</Link>
				<Link to="./#" className={`${styles.sidebar_link} ${styles.exit}`}>
					<img src={exit} className={styles.link_icon} alt="" />
					<span onClick={handleExit}>Выйти</span>
				</Link>
			</div>
		</aside>
	);
}
