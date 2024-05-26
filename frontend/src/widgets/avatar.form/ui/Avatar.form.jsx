import styles from './Avatar.form.module.scss';
import { useState } from 'react';
import avatar from '@shared/assets/img/avatar.jpg';
import Button from '@shared/ui/button/Button';
import { updateProfileAvatar, deleteProfileAvatar } from '@entities/user';

import { ReactComponent as UploadIcon } from '@shared/assets/svg/upload.svg';

export default function AvatarForm() {
	const [preview, setPreview] = useState(null);
	const [userPhoto, setUserPhoto] = useState(
		localStorage.getItem('avatar') || null
	);

	function submitForm(e) {
		e.preventDefault();
		if (!preview && !userPhoto && userPhoto !== 'null') {
			deleteProfileAvatar().then(() => {
				localStorage.removeItem('avatar');
				location.reload();
			});
			return;
		}
		updateProfileAvatar(preview).then(() => {
			location.reload();
		});
	}

	return (
		<form onSubmit={submitForm} className={styles.container}>
			<div className={styles.container_preview}>
				<img
					src={
						preview
							? URL.createObjectURL(preview)
							: userPhoto !== 'null' && userPhoto !== null
								? 'data:image/png;base64,' + userPhoto
								: avatar
					}
					className={styles.img}
				/>
				<Button
					title="Сохранить"
					type="submit"
					className={styles.button}
					width="22%"
				/>
			</div>

			<div className={styles.gallery}>
				<div className={styles.container_images}>
					<img
						src={avatar}
						className={styles.img}
						onClick={() => setUserPhoto(null)}
					/>
				</div>

				<input
					id="input_file"
					type="file"
					accept="image/*"
					hidden
					onChange={(e) => setPreview(e.target.files[0])}
				/>
				<Button
					title="Загрузить c устройства"
					className={styles.button}
					type="button"
					width="fit-content"
					onClick={() => document.getElementById('input_file').click()}
				>
					<UploadIcon />
				</Button>
			</div>
		</form>
	);
}
