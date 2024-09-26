import { User } from '@shared/api';
import styles from './EditProfile.module.scss';

export default function EditProfile() {
	async function resetAvatar() {
		const [, err] = await User.removeAvatar();
		if (!err) location.replace('/');
	}

	return (
		<div className={styles.container}>
			<div className={styles.content} onClick={resetAvatar}>
				resetAvatar
			</div>
		</div>
	);
}
