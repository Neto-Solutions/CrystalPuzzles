import styles from './Avatar.module.scss';
import { Page } from '@shared/ui';
import { FormEvent, useState } from 'react';
import { Button } from '@shared/ui';
import { ReactComponent as UploadIcon } from '@shared/assets/svg/upload.svg';
import LS from '@shared/lib/localStorage';
import { useSelector } from 'react-redux';
import { selectProfile } from '@store/profile';
import { User } from '@shared/api';
import avatar from '@shared/assets/avatar/0.png';

interface AvatarPageProps {
	title: string;
}

export default function AvatarPage({ title }: AvatarPageProps) {
	const { photo } = useSelector(selectProfile);
	const [preview, setPreview] = useState<string>(photo || avatar);
	const [userPhoto, setUserPhoto]: any = useState(null);
	const [err, setErr] = useState<string | null>(null);

	async function submitForm(e: FormEvent) {
		e.preventDefault();
		if (!userPhoto) return;
		const [, err] = await User.setAvatar(userPhoto);
		if (err) {
			setErr(err);
			return;
		}
		LS.remove('avatar');
		location.replace('/');
	}

	return (
		<Page title={title}>
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
							onChange={(e: any) => {
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
							onClick={() => document.getElementById('input_file')?.click()}
						>
							<UploadIcon />
						</Button>
						{err && <div className={styles.error}>{err}</div>}
					</div>
				</div>

				{/* <div className={styles.container_images}>
					{Array.from({ length: 9 }).map((_: any, index: number) => {
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
				</div> */}
			</form>
		</Page>
	);
}
