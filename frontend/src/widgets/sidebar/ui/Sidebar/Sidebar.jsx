import { NavMenuList } from './NavMenu';
import { Account } from '@entities/user/ui/Account';
import { useSelector } from 'react-redux';
import { selectUser, logout } from '@entities/user';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import help from '@shared/assets/svg/help_icon.svg';
import exit from '@shared/assets/svg/exit_icon.svg';
import edit from '@shared/assets/svg/sidebar/edit.svg';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
	const user = useSelector(selectUser);
	const [open, setOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 375);

	useEffect(() => {
		const handleResize = (event) => {
			setIsMobile(event.target.innerWidth < 375);
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
		// открыть или закрыть свайпом - посмотреть как делать
		// onClick={setOpen((prev) => !prev)}
		<div className={styles.wrapper}>
			<button
				className={styles.arrow_wrapp}
				onClick={() => setOpen((prev) => !prev)}
			>
				<svg
					className={styles.icon}
					width="15"
					height="9"
					viewBox="0 0 15 9"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M2.20711 0.792893C1.81658 0.402369 1.18342 0.402369 0.792893 0.792893C0.402369 1.18342 0.402369 1.81658 0.792893 2.20711L6.79289 8.20711C7.18342 8.59763 7.81658 8.59763 8.20711 8.20711L14.2071 2.20711C14.5976 1.81658 14.5976 1.18342 14.2071 0.792893C13.8166 0.402369 13.1834 0.402369 12.7929 0.792893L7.5 6.08579L2.20711 0.792893Z"
						fill="#ffffff"
					/>
				</svg>
			</button>
			<aside className={` ${open ? styles.open : styles.sidebar}`}>
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
