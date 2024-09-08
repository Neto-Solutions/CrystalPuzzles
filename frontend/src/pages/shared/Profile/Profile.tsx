import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Page, Button } from '@shared/ui';
import avatar from '@shared/assets/avatar/0.png';
import styles from './Profile.module.scss';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import joinName from 'entities/profile/assets/joinName';

export default function ProfilePage({ title }: any) {
	const {
		state: { user }
	} = useLocation();
	const navigate = useNavigate();

	return (
		<Page title={title}>
			<div className={styles.container}>
				<section className={styles.student}>
					<img
						className={styles.avatar}
						src={
							(user?.avatar && require(`assets/avatar/${user?.avatar}.png`)) ||
							avatar
						}
					/>
					<Button title="Редактировать данные" className={styles.btn_edit} />
				</section>
				<div className={styles.name}>{joinName(user)}</div>
				<ProfileInfo user={user} className={styles.info} />
				{/* <div className={styles.button_wrapper}>
					<Button title="Добавить в группу" />
					<Button title="Вернуться" onClick={() => navigate(-1)} />
				</div> */}
			</div>
		</Page>
	);
}
