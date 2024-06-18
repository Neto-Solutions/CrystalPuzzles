import styles from './Avatar.form.module.scss';
import { useState } from 'react';
import { Button } from '@shared/ui';
import { updateProfileAvatar, deleteProfileAvatar } from '@entities/user';
import { ReactComponent as UploadIcon } from '@shared/assets/svg/upload.svg';
import LS from '@shared/lib/localStorage';
import { useNavigate } from 'react-router-dom';

export default function AvatarForm() {
	const [preview, setPreview] = useState(null);
	const [userPhoto, setUserPhoto] = useState(LS.get('avatar'));
	const navigate = useNavigate();

	function submitForm(e) {
		e.preventDefault();
		if (!preview && !userPhoto) {
			deleteProfileAvatar().then(() => {
				LS.remove('avatar');
				navigate('/', { replace: true });
			});
			return;
		}
		updateProfileAvatar(preview || userPhoto).then(() => {
			navigate('/', { replace: true });
		});
	}

	return (
		<form onSubmit={submitForm} className={styles.container}>
			<div className={styles.container_preview}>
				<img
					src={
						preview
							? URL.createObjectURL(preview)
							: require('@shared/assets/avatar/' + userPhoto + '.png')
					}
					className={styles.img}
				/>
				<div className={styles.buttons}>
					<Button title="Сохранить" type="submit" className={styles.button} />
					<input
						id="input_file"
						type="file"
						accept="image/*"
						hidden
						onChange={(e) => setPreview(e.target.files[0])}
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
							onClick={() => setUserPhoto(index)}
						/>
					);
				})}
			</div>
		</form>
	);
}
