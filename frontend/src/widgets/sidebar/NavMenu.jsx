import styles from './NavMenu.module.scss';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as Arrow } from '@shared/assets/svg/arrow.svg';
import {
	checkInRouter,
	methodistRouter,
	studentRouter,
	trainerRouter
} from '@shared/const/routes';

export const NavMenuList = ({ role }) => {
	const [isOpen, setOpen] = useState(false);
	const [list, setList] = useState([]);

	useEffect(() => {
		setList(() =>
			checkInRouter.concat(
				(role === 'student' && studentRouter) ||
					(role === 'methodist' && methodistRouter) ||
					(role === 'trainer' && trainerRouter)
			)
		);
	}, [role]);

	return (
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
	);
};

{
	/* <NavMenuList
list={list}
isOpen={isOpen}
className={`${styles.menu} ${isOpen ? styles.active : ''}`}
/> */
}
