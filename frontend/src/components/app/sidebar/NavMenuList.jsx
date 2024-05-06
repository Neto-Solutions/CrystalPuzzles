import { NavLink } from 'react-router-dom';
import styles from './NavMenuList.module.scss';

export const NavMenuList = ({ list, className }) => {
	return (
		<ul className={`${styles.dropdown} ${className}`}>
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
	);
};
