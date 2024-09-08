import styles from './ProfileCard.module.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectProfile } from '@store/profile';
import LS from '@shared/lib/localStorage';
import avatar from '@shared/assets/avatar/0.png';
import classNames from 'classnames';

interface ProfileProps {
	className?: string;
}

export default function ProfileCard({ className }: ProfileProps) {
	const user = useSelector(selectProfile);
	const [userPhoto, setUserPhoto] = useState(LS.get('avatar') || avatar);

	useEffect(() => {
		if (user.avatar) {
			setUserPhoto(require(`@shared/assets/avatar/${user.avatar}.png`));
			return;
		}
	}, [user]);

	return (
		<section className={classNames(styles.profile_container, className)}>
			<img src={userPhoto} alt="" className={styles.avatar} />
			<div className={styles.name_container}>
				<div className={styles.name}>
					{user.surname} {user.firstname}
				</div>
			</div>
		</section>
	);
}
