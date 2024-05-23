import styles from './Account.module.scss';
import avatar from '@shared/assets/img/avatar.jpg';
import roleAdaptor from '../helpers/role.adaptor';
import { useEffect, useMemo, useState } from 'react';
import { getProfileAvatar } from '../api/profile';

export const Account = ({ user }) => {
	const [userPhoto, setUserPhoto] = useState(avatar);
	const position = useMemo(() => roleAdaptor(user.role), [user]);
	useEffect(() => {
		getProfileAvatar()
			.then(({ photo }) => photo !== null && setUserPhoto(photo))
			.catch(() => setUserPhoto(avatar));
	}, [user]);
	return (
		<div className={styles.accaunt_wrap}>
			<img src={userPhoto} className={styles.avatar} alt="" />
			<div>
				<p className={styles.profession}>{position}</p>
				<p className={styles.name}>{user.firstname}</p>
			</div>
		</div>
	);
};
