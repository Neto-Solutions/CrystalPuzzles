import styles from './Account.module.scss';
import avatar from '@shared/assets/avatar/0.png';
import { roleAdapter } from '@entities';
import { useMemo, useState } from 'react';

export const Account = ({ user, className, isMobile }: any) => {
	// eslint-disable-next-line no-unused-vars
	const [userPhoto]: any = useState(
		(user?.avatar && require(`assets/avatar/${user?.avatar}.png`)) || avatar
	);
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
