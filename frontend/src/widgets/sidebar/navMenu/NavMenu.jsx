import styles from './NavMenu.module.scss';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { supervisorRouter, studentRouter, trainerRouter } from '@shared/routes';
import { roleAdapter } from '@entities/profile';

import { ReactComponent as Arrow } from 'assets/svg/arrow.svg';
import home from 'assets/sidebar/home.svg';

export const NavMenuList = ({ role, isMobile }) => {
	const [isOpen, setOpen] = useState(false);
	const [list, setList] = useState([]);

	useEffect(() => {
		setList(
			() =>
				(role === 'student' && studentRouter) ||
				(role === 'supervisor' && supervisorRouter) ||
				(role === 'trainer' && trainerRouter)
		);
	}, [role]);

	return (
		<>
			{isMobile ? (
				<nav className={styles.nav}>
					<div className={styles.role}>{roleAdapter(role)}</div>
					<ul className={styles.mobile_list}>
						<li>
							<Link to="/">
								<img src={home} />
							</Link>
						</li>
						{list?.map((item, index) => {
							return (
								item.local && (
									<li key={index}>
										<NavLink to={item.path}>
											<img src={item.img} />
										</NavLink>
									</li>
								)
							);
						})}
					</ul>
				</nav>
			) : (
				<nav className={styles.nav}>
					<div className={styles.dropdown_wrap}>
						<Link to="/" className={styles.dropdown}>
							главная
						</Link>

						<Arrow
							className={isOpen ? styles.arrow_active : styles.arrow}
							onClick={() => setOpen(!isOpen)}
						/>
					</div>

					<ul className={`${styles.menu} ${isOpen ? styles.active : ''}`}>
						{list?.map((item, index) => {
							return (
								item.local && (
									<li className={styles.item} key={index}>
										<NavLink to={item.path} className={styles.link}>
											{item.local}
										</NavLink>
									</li>
								)
							);
						})}
					</ul>
				</nav>
			)}
		</>
	);
};
