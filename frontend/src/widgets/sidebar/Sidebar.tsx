import styles from './Sidebar.module.scss';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useSwipe, useResize } from '@hooks';
import { selectProfile } from '@store/profile';
import { ReactComponent as Arrow } from '@assets/svg/arrow.svg';
import exit from 'assets/sidebar/exit.svg';
import { Auth } from '@api';
import { NavMenuList } from './navMenu/NavMenu';
import { Account } from './accaunt/Account';

export default function Sidebar() {
	const [isOpen, setIsOpen]: any = useState(false);
	const user = useSelector(selectProfile);
	const isMobile = useResize('md');

	useSwipe(
		(isOpen: any) => {
			if (isMobile) {
				setIsOpen(isOpen);
			}
		},
		[isMobile]
	);

	async function handleExit(): Promise<void> {
		await Auth.logout();
	}

	return (
		<div className={styles.wrapper}>
			<aside className={isOpen ? styles.sidebar_open : styles.sidebar}>
				{isMobile && (
					<button
						className={isOpen ? styles.arrow_close : styles.arrow_open}
						onClick={() => setIsOpen((prev: any) => !prev)}
					>
						<Arrow className={styles.arrow_svg} />
					</button>
				)}
				<Account user={user} className={styles.account} isMobile={isMobile} />
				<NavMenuList role={user.role} isMobile={isMobile} />

				<div className={styles.links}>
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
