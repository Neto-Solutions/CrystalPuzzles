import styles from './Account.module.scss';
import { useMemo } from 'react';

export const Account = ({ user }) => {
	const position = useMemo(() => {
		switch (user.role) {
			case 'student':
				return 'ученик';

			case 'methodist':
				return 'методист';

			case 'trainer':
				return 'тренер';

			default:
				return 'error';
		}
	}, [user]);
	return (
		<div className={styles.accaunt_wrap}>
			<img src={user.avatar} className={styles.avatar} alt="" />
			<div>
				<p className={styles.profession}>{position}</p>
				<p className={styles.name}>{user.name}</p>
			</div>
		</div>
	);
};
