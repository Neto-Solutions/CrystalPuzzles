import help from '@assets/svg/help_icon.svg';
import exit from '@assets/svg/exit_icon.svg';
import { Link } from 'react-router-dom';
import { NavMenuList } from './NavMenu';
import { Account } from './Account';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
	function handleExit() {
		localStorage.clear();
		window.location.reload();
	}
	return (
		<aside className={styles.sidebar}>
			<Account />
			<div className={styles.line}></div>
			<NavMenuList />
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
