import { User } from '@shared/api';
import styles from './EditProfile.module.scss';
import { Button, Modal } from '@shared/ui';
import { selectProfile } from '@app/providers/store/profile';
import { useSelector } from 'react-redux';
import avatar from '@shared/assets/avatar/0.png';
import UploadAvatar from './uploadAvatar/UploadAvatar';
import { FormEvent, useState } from 'react';
import { mapUserForm } from '@entities';
import joinName from 'entities/profile/assets/joinName';
import moment from 'moment';

export default function EditProfile({ active, setActive }: any) {
	const profile = useSelector(selectProfile);

	const [preview, setPreview] = useState<string>(
		profile.photo
			? profile.photo
			: profile.avatar
				? require(`assets/avatar/${profile.avatar}.png`)
				: avatar
	);
	const [userPhoto, setUserPhoto]: any = useState(null);
	const [err, setErr] = useState<string | null>(null);

	async function submitForm(e: FormEvent) {
		e.preventDefault();
		const data = mapUserForm(e);
		console.log(data);
		if (!userPhoto) return;
		const [, err] = await User.setAvatar(userPhoto);
		if (err) {
			setErr(err);
			return;
		}
		location.replace('/');
	}
	console.log(profile)
	return (
		<Modal active={active} setActive={setActive} className={styles.modal}>
			<header className={styles.header}>Редактировать данные</header>
			<form onSubmit={submitForm} className={styles.container}>
				<div className={styles.avatar}>
					<img src={preview} alt="avatar" />
					<UploadAvatar
						setPreview={setPreview}
						setUserPhoto={setUserPhoto}
						setErr={setErr}
					/>
				</div>
				{err ? <div className={styles.err}>{err}</div> : null}
				<div className={styles.info}>
					<div>
						<label htmlFor="">ФИО</label>
						<input
							data-key="name"
							type="text"
							defaultValue={joinName(profile)}
						/>
					</div>
					<div>
						<label htmlFor="">Дата рождения</label>
						<input
							data-key="birthday"
							type="text"
							defaultValue={moment(profile.birthday).format('DD-MM-YYYY')}
						/>
					</div>
					<div>
						<label htmlFor="">Район проживания</label>
						<input type="text" />
					</div>
					<div>
						<label htmlFor="">Сопровождающий</label>
						<input type="text" />
					</div>
					<div>
						<label htmlFor="">Номер телефона</label>
						<input type="text" />
					</div>
					<div>
						<label htmlFor="">Особенности развития</label>
						<input type="text" />
					</div>
					<div>
						<label htmlFor="">Не любит</label>
						<input type="text" />
					</div>
				</div>
				<div className={styles.buttons}>
					<Button title="Сохранить" type="submit" className={styles.btn} />
					<Button title="Закрыть" className={styles.btn} />
				</div>
			</form>
		</Modal>
	);
}
