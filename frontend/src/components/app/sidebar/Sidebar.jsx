import avatar from '@assets/svg/avatar.svg';
import help from '@assets/svg/help_icon.svg';
import exit from '@assets/svg/exit_icon.svg';
import { Link } from 'react-router-dom';
import { NavMenuList } from './NavMenu';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.accaunt_wrap}>
				<img src={avatar} className={styles.avatar} alt="" />
				<div>
					<p className={styles.profession}>методист</p>
					<p className={styles.name}>Антонина</p>
				</div>
			</div>
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
					<span>Выйти</span>
				</Link>
			</div>
		</aside>
	);
}
