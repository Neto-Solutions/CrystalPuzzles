import styles from './Avatar.form.module.scss';
import { useState } from 'react';
import Button from '@shared/ui/button/Button';
import { updateProfileAvatar, deleteProfileAvatar } from '@entities/user';
import { ReactComponent as UploadIcon } from '@shared/assets/svg/upload.svg';
import LS from '@shared/lib/localStorage';
import { useNavigate } from 'react-router-dom';
import img0 from '@shared/assets/avatar/0.png';
import img1 from '@shared/assets/avatar/1.png';
import img2 from '@shared/assets/avatar/2.png';
import img3 from '@shared/assets/avatar/3.png';
import img4 from '@shared/assets/avatar/4.png';
import img5 from '@shared/assets/avatar/5.png';
import img6 from '@shared/assets/avatar/6.png';
import img7 from '@shared/assets/avatar/7.png';
import img8 from '@shared/assets/avatar/8.png';

const imgs = [img0, img1, img2, img3, img4, img5, img6, img7, img8];

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
		updateProfileAvatar(preview).then(() => {
			navigate('/', { replace: true });
		});
	}

	return (
		<form onSubmit={submitForm} className={styles.container}>
			<div className={styles.container_preview}>
				<img
					src={preview ? URL.createObjectURL(preview) : imgs[userPhoto]}
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
					{imgs.map((el, index) => {
						if (!index) return;
						return (
							<img
								key={index}
								src={el}
								className={styles.img}
								onClick={() => setUserPhoto(index)}
							/>
						);
					})}
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
