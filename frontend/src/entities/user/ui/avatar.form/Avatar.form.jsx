import styles from './Avatar.form.module.scss';
import avatar from '@shared/assets/img/avatar.jpg';
import Button from '@shared/ui/button/Button';
import { useState } from 'react';
import { updateProfileAvatar } from '../../api/profile';

export default function AvatarFrom({ onHide, userPhoto }) {
	const [preview, setPreview] = useState(null);
	function submitForm(e) {
		e.preventDefault();
		updateProfileAvatar(preview);
	}
	return (
		<div className={styles.container} onClick={onHide}>
			<form
				onSubmit={submitForm}
				onClick={(e) => e.stopPropagation()}
				className={styles.form}
			>
				<img
					src={
						preview
							? URL.createObjectURL(preview)
							: userPhoto
								? 'data:image/png;base64,' + userPhoto
								: avatar
					}
					className={styles.img}
				/>

				<input
					id="input_file"
					type="file"
					accept="image/*"
					hidden
					onChange={(e) => setPreview(e.target.files[0])}
				/>
				<label htmlFor="input_file" className={styles.label}>
					Выберите фото
				</label>
				<Button title="Принять" type="submit" height="40px" />
			</form>
		</div>
	);
}
