import styles from './NavMenu.module.scss';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import home from '@shared/assets/svg/sidebar/home.svg';
import { ReactComponent as Arrow } from '@shared/assets/svg/arrow.svg';
import {
	checkInRouter,
	supervisorRouter,
	studentRouter,
	trainerRouter
} from '@shared/const/routes';

export const NavMenuList = ({ role, isMobile }) => {
	const [isOpen, setOpen] = useState(false);
	const [list, setList] = useState([]);

	useEffect(() => {
		setList(() =>
			checkInRouter.concat(
				(role === 'student' && studentRouter) ||
					(role === 'supervisor' && supervisorRouter) ||
					(role === 'trainer' && trainerRouter)
			)
		);
	}, [role]);

	return (
		<>
			{isMobile ? (
				<nav className={styles.nav}>
					<div className={styles.role}>{role}</div>
					<ul className={styles.mobile_list}>
						<li>
							<Link to="/">
								<img src={home} />
							</Link>
						</li>
						{list.map((item, index) => {
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
						{list.map((item, index) => {
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
