import styles from './UploadAvatar.module.scss';
import { ReactComponent as UploadIcon } from '@shared/assets/svg/upload.svg';

export default function UploadAvatar({
	setPreview,
	setUserPhoto,
	setErr
}: any) {
	return (
		<div className={styles.container}>
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
			<div className={styles.upload}>
				<UploadIcon
					onClick={() => document.getElementById('input_file')?.click()}
				/>
			</div>
		</div>
	);
}
