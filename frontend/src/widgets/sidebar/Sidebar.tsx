import styles from './Sidebar.module.scss';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useResize from '@shared/hooks/useResize';
import { useSwipe } from '@hooks';
import { NavMenuList } from './navMenu/NavMenu';
import { Account } from './accaunt/Account';
import { selectProfile } from '@store/profile';
import { ReactComponent as Arrow } from '@assets/svg/arrow.svg';
// import help from 'assets/sidebar/help.svg';
import exit from 'assets/sidebar/exit.svg';
import edit from 'assets/sidebar/edit.svg';

import LS from '@shared/lib/localStorage';

export default function Sidebar() {
	const [isOpen, setIsOpen]: any = useState(false);
	const user = useSelector(selectProfile);
	const navigate = useNavigate();
	const isMobile = useResize('md');

	useSwipe((isOpen: any) => setIsOpen(isOpen));

	async function handleExit() {
		LS.remove('profile');
		location.reload();
		return null;
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
						className={`${styles.sidebar_btn} ${styles.help}`}
						onClick={() => navigate('/avatar')}
					>
						<img src={edit} className={styles.link_icon} />
						{!isMobile && <span>Изменить аватарку</span>}
					</div>
					{/* <div className={`${styles.sidebar_btn} ${styles.help}`}>
						<img src={help} className={styles.link_icon} />
						{!isMobile && <span>Помощь</span>}
					</div> */}

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
