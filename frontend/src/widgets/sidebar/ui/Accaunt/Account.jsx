import styles from './Account.module.scss';
import avatar from '@shared/assets/avatar/0.png';
import { roleAdapter } from '@entities/user';
import { useMemo, useState } from 'react';
import LS from '@shared/lib/localStorage';

export const Account = ({ user, className, isMobile }) => {
	// eslint-disable-next-line no-unused-vars
	const [userPhoto, setUserPhoto] = useState(LS.get('avatar') || avatar);
	const position = useMemo(() => roleAdapter(user.role), [user]);

	return (
		<div className={`${styles.accaunt_wrap} ${className}`}>
			<img src={userPhoto} className={styles.avatar} alt="" />
			{!isMobile && (
				<div>
					<p className={styles.profession}>{position}</p>
					<p className={styles.name}>{user.firstname}</p>
				</div>
			)}
		</div>
	);
};
