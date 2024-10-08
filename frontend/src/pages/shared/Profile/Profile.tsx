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
}

export default function ProfilePage({ title }: ProfilePageProps) {
	const [edit, setEdit] = useState<boolean>(false);
	const {
		state: { user }
	} = useLocation();

	return (
		<Page title={title}>
			<EditProfile
				active={edit}
				setActive={setEdit}
				onClick={() => setEdit(false)}
			/>
			<div className={styles.container}>
				<div className={styles.student}>
					<img className={styles.avatar} src={user?.photo || avatar} />
				</div>
				<Button
					bgColor="dark"
					title="Редактировать данные"
					className={styles.btn_edit}
					onClick={() => setEdit(!edit)}
				/>
				<div className={styles.name}>{joinName(user)}</div>
				<ProfileInfo user={user} className={styles.info} />
			</div>
		</Page>
	);
}
