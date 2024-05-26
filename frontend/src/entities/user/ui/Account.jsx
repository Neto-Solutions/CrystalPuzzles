import styles from './Account.module.scss';
import avatar from '@shared/assets/img/avatar.jpg';
import roleAdaptor from '../helpers/role.adaptor';
import { useEffect, useMemo, useState } from 'react';
import { getProfileAvatar } from '../api/profile';
import { Link } from 'react-router-dom';

export const Account = ({ user }) => {
	const [userPhoto, setUserPhoto] = useState(
		localStorage.getItem('avatar') || null
	);
	const position = useMemo(() => roleAdaptor(user.role), [user]);

	useEffect(() => {
		let cachedAvatar = localStorage.getItem('avatar');
		if (cachedAvatar !== 'null' && cachedAvatar !== null) return;
		getProfileAvatar()
			.then(({ photo }) => {
				setUserPhoto(photo);
				return photo;
			})
			.then((photo) => {
				localStorage.setItem('avatar', photo);
			})
			.catch(() => setUserPhoto(null));
	}, [user]);

	return (
		<div className={styles.accaunt_wrap}>
			<Link to="/avatar">
				<img
					src={
						userPhoto !== 'null' && userPhoto !== null
							? 'data:image/png;base64,' + userPhoto
							: avatar
					}
					className={styles.avatar}
					alt=""
				/>
			</Link>
			<div>
				<p className={styles.profession}>{position}</p>
				<p className={styles.name}>{user.firstname}</p>
			</div>
		</div>
	);
};
