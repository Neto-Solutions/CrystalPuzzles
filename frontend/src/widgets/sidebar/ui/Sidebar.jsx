import styles from './Sidebar.module.scss';
import help from '@shared/assets/svg/help_icon.svg';
import exit from '@shared/assets/svg/exit_icon.svg';
import { NavMenuList } from './NavMenu';
import { Account } from '@entities/user/ui/Account';
import { useSelector } from 'react-redux';
import { selectUser, logout } from '@entities/user';
import Cookies from 'js-cookie';

export default function Sidebar() {
	const user = useSelector(selectUser);

	function handleExit() {
		logout()
			.then(() => {
				Cookies.remove('token');
				localStorage.clear();
			})
			.finally(() => location.reload());
	}

	return (
		<aside className={styles.sidebar}>
			<Account user={user} />
			<div className={styles.line}></div>
			<NavMenuList role={user.role} />
			<div className={styles.line}></div>
			<div className={styles.links}>
				<div className={`${styles.sidebar_btn} ${styles.help}`}>
					<img src={help} className={styles.link_icon} alt="" />
					<span>Помощь</span>
				</div>
				<div className={`${styles.sidebar_btn} ${styles.exit}`}>
					<img src={exit} className={styles.link_icon} alt="" />
					<span onClick={handleExit}>Выйти</span>
				</div>
			</div>
		</aside>
	);
}
