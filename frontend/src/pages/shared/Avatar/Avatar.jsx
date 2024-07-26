import styles from './Avatar.module.scss';
import { Page } from '@shared/ui';
import { useState } from 'react';
import { Button } from '@shared/ui';
import { updateProfileAvatar } from '@entities/user';
import { ReactComponent as UploadIcon } from '@shared/assets/svg/upload.svg';
import LS from '@shared/lib/localStorage';
import { useSelector } from 'react-redux';
import { selectUser } from '@entities/user';
export default function AvatarPage() {
	const { avatar } = useSelector(selectUser);
	const [preview, setPreview] = useState(
		LS.get('avatar') || require(`@shared/assets/avatar/${avatar}.png`)
	);
	const [userPhoto, setUserPhoto] = useState(null);
	const [err, setErr] = useState(null);

	function submitForm(e) {
		e.preventDefault();
		if (!userPhoto) return;
		LS.remove('avatar');
		updateProfileAvatar(userPhoto).then(() => {
			location.replace('/');
		});
	}
	return (
		<Page title="Изменить аватарку">
			<form onSubmit={submitForm} className={styles.container}>
				<div className={styles.container_preview}>
					<img src={preview} className={styles.img} />
					<div className={styles.buttons}>
						<Button title="Сохранить" type="submit" className={styles.button} />
						<input
							id="input_file"
							type="file"
							accept="image/png, image/jpeg"
							hidden
							onChange={(e) => {
								if (e.target.files[0].size > 5 * 1024 * 1024) {
									setErr('Фото должно быть меньше 5 МБ');
									return;
								}
								setErr(null);
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
						{err && <div className={styles.error}>{err}</div>}
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
									setPreview(
										require('@shared/assets/avatar/' + index + '.png')
									);
								}}
							/>
						);
					})}
				</div>
			</form>
		</Page>
	);
}
