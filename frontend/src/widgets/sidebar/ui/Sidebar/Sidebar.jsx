import { NavMenuList } from './NavMenu';
import { Account } from '@entities/user/ui/Account';
import { useSelector } from 'react-redux';
import { selectUser, logout } from '@entities/user';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { ReactComponent as Arrow } from '@shared/assets/svg/arrow.svg';
import help from '@shared/assets/svg/help_icon.svg';
import exit from '@shared/assets/svg/exit_icon.svg';
import edit from '@shared/assets/svg/sidebar/edit.svg';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
	const user = useSelector(selectUser);
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

	useEffect(() => {
		const handleResize = (event) => {
			setIsMobile(event.target.innerWidth <= 768);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	function handleExit() {
		logout()
			.then(() => {
				Cookies.remove('token');
				location.reload();
			})
			.catch(() => location.reload());
	}

	return (
		// открыть или закрыть свайпом - доделать
		<div className={styles.wrapper}>
			<aside className={isOpen ? styles.sidebar_open : styles.sidebar}>
				{isMobile && (
					<button
						className={isOpen ? styles.arrow_close : styles.arrow_open}
						onClick={() => setIsOpen((prev) => !prev)}
					>
						<Arrow className={styles.arrow_svg} />
					</button>
				)}
				<Account user={user} className={styles.account} isMobile={isMobile} />
				<NavMenuList role={user.role} isMobile={isMobile} />
				<div className={styles.links}>
					<div className={`${styles.sidebar_btn} ${styles.help}`}>
						<img src={help} className={styles.link_icon} />
						{!isMobile && <span>Помощь</span>}
					</div>
					{isMobile && (
						<div className={styles.sidebar_btn}>
							<img src={edit} className={styles.link_icon} />
						</div>
					)}
					<div
						className={`${styles.sidebar_btn} ${styles.exit}`}
						onClick={handleExit}
					>
						<img src={exit} className={styles.link_icon} />
						{!isMobile && <span>Выйти</span>}
					</div>
				</div>
			</aside>
		</div>
	);
}
