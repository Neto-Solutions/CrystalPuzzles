import { Dispatch, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Auth, User } from '@shared/api';
import { Button, Modal, Title } from '@shared/ui';
import { selectProfile } from '@app/providers/store/profile';
import avatar from '@shared/assets/avatar/0.png';
import { mapUserForm } from '@entities';
import { ReactComponent as CloseButton } from '@shared/assets/svg/close.svg';
import joinName from 'entities/profile/assets/joinName';
import UploadAvatar from './uploadAvatar/UploadAvatar';
import styles from './EditProfile.module.scss';

interface EditProfileProps {
	active: boolean;
	setActive: Dispatch<React.SetStateAction<boolean>>;
	onClick?: () => void;
}

export default function EditProfile({
	active,
	setActive,
	onClick
}: EditProfileProps) {
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
		const { area, accompanying, health_data, triggers, ...rest } = data;
		const newData = {
			...rest,
			birthday: moment(data.birthday).toDate(),
			extensions: {
				area,
				accompanying,
				health_data,
				triggers
			}
		};

		let [, err] = await Auth.updateProfile(newData);
		if (err) {
			setErr(err);
			return;
		}
		if (!userPhoto) location.replace('/');
		[, err] = await User.setAvatar(userPhoto);
		if (err) {
			setErr(err);
			return;
		}
		location.replace('/');
	}
	return (
		<Modal active={active} setActive={setActive} className={styles.modal}>
			<div className={styles.compomemt}>
				<header className={styles.header}>
					<Title tag="h2" className={styles.title}>
						Редактировать данные
					</Title>
					<button className={styles.close_btn} onClick={onClick}>
						<CloseButton className={styles.icon} />
					</button>
				</header>
				<form onSubmit={submitForm} className={styles.form}>
					<div className={styles.avatar_wrapper}>
						<div className={styles.avatar}>
							<img src={preview} alt="avatar" className={styles.img} />
							<UploadAvatar
								setPreview={setPreview}
								setUserPhoto={setUserPhoto}
								setErr={setErr}
							/>
						</div>
						{err ? <div className={styles.err}>{err}</div> : null}
					</div>
					<div className={styles.info}>
						<div className={styles.input_wrapper}>
							<label htmlFor="">ФИО</label>
							<input
								className={styles.input}
								data-key="name"
								type="text"
								defaultValue={joinName(profile)}
							/>
						</div>
						<div className={styles.input_wrapper}>
							<label htmlFor="">Дата рождения</label>
							<input
								className={styles.input}
								data-key="birthday"
								type="date"
								defaultValue={profile.birthday}
							/>
						</div>
						<div className={styles.input_wrapper}>
							<label htmlFor="">Район проживания</label>
							<input
								className={styles.input}
								type="text"
								data-key="area"
								defaultValue={profile.extensions?.area}
							/>
						</div>
						<div className={styles.input_wrapper}>
							<label htmlFor="">Сопровождающий</label>
							<input
								className={styles.input}
								type="text"
								data-key="accompanying"
								defaultValue={profile.extensions?.accompanying}
							/>
						</div>
						<div className={styles.input_wrapper}>
							<label htmlFor="">Номер телефона</label>
							<input
								className={styles.input}
								type="tel"
								pattern="^\+?7\d{10}$"
								defaultValue={profile.contact}
								placeholder="+71231231212"
								data-key="contact"
							/>
						</div>
						<div className={styles.input_wrapper}>
							<label htmlFor="">Особенности развития</label>
							<input
								className={styles.input}
								type="text"
								data-key="health_data"
								defaultValue={profile.extensions?.health_data}
							/>
						</div>
						<div className={styles.input_wrapper}>
							<label htmlFor="">Не любит</label>
							<input
								className={styles.input}
								type="text"
								data-key="triggers"
								defaultValue={profile.extensions?.triggers}
							/>
						</div>
					</div>
					<div className={styles.button_wrapper}>
						<Button title="Сохранить" type="submit" className={styles.btn} />
					</div>
				</form>
			</div>
		</Modal>
	);
}
