import styles from './Profile.module.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@entities/user';
import LS from '@shared/lib/localStorage';
import avatar from '@shared/assets/avatar/0.png';

export default function Profile({ className }) {
	const user = useSelector(selectUser);
	const [userPhoto, setUserPhoto] = useState(LS.get('avatar') || avatar);

	useEffect(() => {
		if (user.avatar) {
			setUserPhoto(require(`@shared/assets/avatar/${user.avatar}.png`));
			return;
		}
	}, [user]);

	return (
		<section className={styles.profile_container + ' ' + className}>
			<img src={userPhoto} alt="" className={styles.avatar} />
			<div className={styles.name_container}>
				<div className={styles.name}>
					{user.surname} {user.firstname}
				</div>
			</div>
		</section>
	);
}
