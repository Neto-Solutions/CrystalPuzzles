import styles from './Account.module.scss';
import avatar from '@shared/assets/avatar/0.png';
import roleAdaptor from '@entities/user/helpers/role.adaptor';
import { useEffect, useMemo, useState } from 'react';
import { getProfileAvatar } from '@entities/user/api/profile';
import LS from '@shared/lib/localStorage';

export const Account = ({ user, className, isMobile }) => {
	const [userPhoto, setUserPhoto] = useState(LS.get('avatar') || avatar);
	const position = useMemo(() => roleAdaptor(user.role), [user]);

	useEffect(() => {
		if (LS.get('avatar')) return;
		getProfileAvatar()
			.then(({ photo }) => {
				if (!photo) return;
				setUserPhoto(photo);
				LS.set('avatar', photo);
				return photo;
			})
			.catch(() => setUserPhoto(avatar));
	}, [user]);

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
