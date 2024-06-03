import styles from './Account.module.scss';
import avatar from '@shared/assets/avatar/0.png';
import roleAdaptor from '../helpers/role.adaptor';
import { useEffect, useMemo, useState } from 'react';
import { getProfileAvatar } from '../api/profile';
import LS from '@shared/lib/localStorage';

export const Account = ({ user, className, isMobile }) => {
	const [userPhoto, setUserPhoto] = useState(avatar);
	// const [userPhoto, setUserPhoto] = useState(LS.get('avatar'));

	const position = useMemo(() => roleAdaptor(user.role), [user]);

	useEffect(() => {
		if (LS.get('avatar')) return;
		getProfileAvatar()
			.then(({ photo }) => {
				setUserPhoto(photo);
				return photo;
			})
			.then((photo) => {
				LS.set('avatar', photo);
			})
			.catch(() => setUserPhoto(null));
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

{
	/* <div className={styles.accaunt_wrap}>
			<img
				src={
					userPhoto !== 'null' && userPhoto !== null
						? 'data:image/png;base64,' + userPhoto
						: avatar
				}
				className={styles.avatar}
				alt=""
			/>

			<div>
				<p className={styles.profession}>{position}</p>
				<p className={styles.name}>{user.firstname}</p>
			</div> */
}
