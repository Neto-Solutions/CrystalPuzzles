import avatar from '@assets/svg/avatar.svg';
import help from '@assets/svg/help_icon.svg';
import exit from '@assets/svg/exit_icon.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavMenuList } from './NavMenuList';
import styles from './Sidebar.module.scss';
import kidsRouter from '../../../routes/kids.router';
import methodistRouter from '../../../routes/methodist.router';
import trainerRouter from '../../../routes/trainer.router';
import checkInRouter from '../../../routes/check.in.router';
import { useSelector } from 'react-redux';
import { ReactComponent as Arrow } from '@assets/svg/calendar_arrow_down.svg';

export default function Sidebar() {
	const [isOpen, setOpen] = useState(false);
	const role = useSelector((state) => state.user.role);
	const [list, setList] = useState([]);

	useEffect(() => {
		setList(() =>
			checkInRouter.concat(
				(role === 'kids' && kidsRouter) ||
					(role === 'methodist' && methodistRouter) ||
					(role === 'trainer' && trainerRouter)
			)
		);
	}, [role]);

	return (
		<aside className={styles.sidebar}>
			<div className={styles['accaunt_wrap']}>
				<img src={avatar} className={styles.avatar} alt="" />
				<div>
					<p className={styles.profession}>методист</p>
					<p className={styles.name}>Антонина</p>
				</div>
			</div>
			<div className={styles.line}></div>
			<nav>
				<div onClick={() => setOpen(!isOpen)} className={styles['nav_wrap']}>
					<div className={styles.nav}>главная</div>
					<Arrow className={isOpen && styles.arrow} />
				</div>
				<NavMenuList list={list} className={isOpen ? styles.active : ''} />
			</nav>
			<div className={styles.line}></div>
			<div className={styles.links}>
				<Link to="./#" className={`${styles['sidebar_link']} ${styles.help}`}>
					<img src={help} className={styles['link_icon']} alt="" />
					<span>Помощь</span>
				</Link>
				<Link to="./#" className={`${styles['sidebar_link']} ${styles.exit}`}>
					<img src={exit} className={styles['link_icon']} alt="" />
					<span>Выйти</span>
				</Link>
			</div>
		</aside>
	);
}
