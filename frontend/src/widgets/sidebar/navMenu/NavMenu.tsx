import styles from './NavMenu.module.scss';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { supervisorRouter, studentRouter, trainerRouter } from '@shared/routes';
import { roleAdapter } from '@entities';

import { ReactComponent as Arrow } from 'assets/svg/arrow.svg';
import home from 'assets/sidebar/home.svg';

export const NavMenuList = ({ role, isMobile }: any) => {
	const [isOpen, setOpen]: any = useState(false);
	const [list, setList]: any = useState([]);

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
						<li className={styles.mobile_item}>
							<Link to="/">
								<img
									src={home}
									loading="eager"
									alt=""
									onError={(e) => {
										const img = e.target as HTMLImageElement;
										img.src = home;
									}}
								/>
							</Link>
						</li>
						{list?.map((item: any, index: any) => {
							return (
								item.local && (
									<li key={index} className={styles.mobile_item}>
										<NavLink to={item.path}>
											<img
												src={item.img}
												loading="eager"
												alt=""
												onError={(e) => {
													const img = e.target as HTMLImageElement;
													img.src = item.img;
												}}
											/>
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
						{list?.map((item: any, index: any) => {
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
