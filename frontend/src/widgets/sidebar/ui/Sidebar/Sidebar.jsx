import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useResize from '@shared/hooks/useResize';
import { useSwipe } from '@hooks';
import { NavMenuList } from './NavMenu';
import { Account } from '../Accaunt/Account';
import { selectProfile } from '@entities/user';
import { ReactComponent as Arrow } from '@shared/assets/svg/arrow.svg';
import help from '@shared/assets/svg/help_icon.svg';
import exit from '@shared/assets/svg/exit_icon.svg';
import edit from '@shared/assets/svg/sidebar/edit.svg';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);
	const user = useSelector(selectProfile);
	const navigate = useNavigate();
	const isMobile = useResize('md');

	useSwipe((isOpen) => setIsOpen(isOpen));

	async function handleExit() {
		return null;
	}

	return (
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
					<div
						className={`${styles.sidebar_btn} ${styles.help}`}
						onClick={() => navigate('/avatar')}
					>
						<img src={edit} className={styles.link_icon} />
						{!isMobile && <span>Изменить аватарку</span>}
					</div>
					<div className={`${styles.sidebar_btn} ${styles.help}`}>
						<img src={help} className={styles.link_icon} />
						{!isMobile && <span>Помощь</span>}
					</div>

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
