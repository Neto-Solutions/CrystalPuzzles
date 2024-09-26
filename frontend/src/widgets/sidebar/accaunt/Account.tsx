import styles from './Account.module.scss';
import avatar from '@shared/assets/avatar/0.png';
import { roleAdapter } from '@entities';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const Account = ({ user, className, isMobile }: any) => {
	const position = useMemo(() => roleAdapter(user.role), [user]);
	const navigate = useNavigate();

	return (
		<div className={`${styles.accaunt_wrap} ${className}`}>
			<img
				src={user.photo ? user.photo : avatar}
				className={styles.avatar}
				alt=""
				onClick={() => navigate('./profile', { state: { user } })}
			/>
			{!isMobile && (
				<div>
					<p className={styles.profession}>{position}</p>
					<p className={styles.name}>{user.firstname}</p>
				</div>
			)}
		</div>
	);
};
