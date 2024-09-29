import { useLocation } from 'react-router-dom';
import { Page, Button } from '@shared/ui';
import avatar from '@shared/assets/avatar/0.png';
import styles from './Profile.module.scss';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import joinName from 'entities/profile/assets/joinName';
import { useState } from 'react';
import EditProfile from './editProfile/EditProfile';

export default function ProfilePage({ title }: any) {
	const [edit, setEdit] = useState(false);
	const {
		state: { user }
	} = useLocation();

	return (
		<Page title={title}>
			<EditProfile active={edit} setActive={setEdit} />
			<div className={styles.container}>
				<section className={styles.student}>
					<img className={styles.avatar} src={user?.photo || avatar} />
					<Button
						title="Редактировать данные"
						className={styles.btn_edit}
						onClick={() => setEdit(!edit)}
					/>
				</section>
				<div className={styles.name}>{joinName(user)}</div>
				<ProfileInfo user={user} className={styles.info} />
			</div>
		</Page>
	);
}
