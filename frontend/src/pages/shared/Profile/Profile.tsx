import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Page, Button } from '@shared/ui';
import joinName from 'entities/profile/assets/joinName';
import avatar from '@shared/assets/avatar/0.png';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import EditProfile from './editProfile/EditProfile';
import styles from './Profile.module.scss';

interface ProfilePageProps {
	title: string;
	blockEdit?: boolean;
}

export default function ProfilePage({
	title,
	blockEdit = false
}: ProfilePageProps) {
	const [editProfile, setEditProfile] = useState<boolean>(false);
	const {
		state: { user }
	} = useLocation();

	return (
		<Page title={title}>
			<EditProfile
				active={editProfile}
				setActive={setEditProfile}
				onClick={() => setEditProfile(false)}
			/>
			<div className={styles.container}>
				<div className={styles.student}>
					<img className={styles.avatar} src={user?.photo || avatar} />
				</div>
				{blockEdit ? null : (
					<Button
						bgColor="dark"
						title="Редактировать данные"
						className={styles.btn_edit}
						onClick={() => setEditProfile(!editProfile)}
					/>
				)}
				<div className={styles.name}>{joinName(user)}</div>
				<ProfileInfo user={user} className={styles.info} />
			</div>
		</Page>
	);
}
