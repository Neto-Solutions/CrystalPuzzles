import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as Arrow } from '@assets/svg/calendar_arrow_down.svg';
import kidsRouter from '../../../routes/kids.router';
import methodistRouter from '../../../routes/methodist.router';
import trainerRouter from '../../../routes/trainer.router';
import checkInRouter from '../../../routes/check.in.router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './NavMenuList.module.scss';

export const NavMenuList = () => {
	const [isOpen, setOpen] = useState(false);
	const [list, setList] = useState([]);
	const role = useSelector((state) => state.user.role);

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
