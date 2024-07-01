import styles from './Avatar.form.module.scss';
import { useState } from 'react';
import { Button } from '@shared/ui';
import { updateProfileAvatar } from '@entities/user';
import { ReactComponent as UploadIcon } from '@shared/assets/svg/upload.svg';
import LS from '@shared/lib/localStorage';
import { useSelector } from 'react-redux';
import { selectUser } from '@entities/user';

export default function AvatarForm() {
	const { avatar } = useSelector(selectUser);
	const [preview, setPreview] = useState(
		LS.get('avatar') || require(`@shared/assets/avatar/${avatar}.png`)
	);
	const [userPhoto, setUserPhoto] = useState(null);

	function submitForm(e) {
		e.preventDefault();
		if (!userPhoto) return;
		LS.remove('avatar');
		updateProfileAvatar(userPhoto).then(() => {
			location.reload();
		});
	}

	return (
		<form onSubmit={submitForm} className={styles.container}>
			<div className={styles.container_preview}>
				<img src={preview} className={styles.img} />
				<div className={styles.buttons}>
					<Button title="Сохранить" type="submit" className={styles.button} />
					<input
						id="input_file"
						type="file"
						accept="image/*"
						hidden
						onChange={(e) => {
							setUserPhoto(e.target.files[0]);
							setPreview(URL.createObjectURL(e.target.files[0]));
						}}
					/>
					<Button
						title="Загрузить"
						className={styles.button}
						type="button"
						onClick={() => document.getElementById('input_file').click()}
					>
						<UploadIcon />
					</Button>
				</div>
			</div>

			<div className={styles.container_images}>
				{Array.from({ length: 9 }).map((_, index) => {
					if (!index) return;
					return (
						<img
							key={index}
							src={require('@shared/assets/avatar/' + index + '.png')}
							className={styles.img}
							onClick={() => {
								setUserPhoto(index);
								setPreview(require('@shared/assets/avatar/' + index + '.png'));
							}}
						/>
					);
				})}
			</div>
		</form>
	);
}
