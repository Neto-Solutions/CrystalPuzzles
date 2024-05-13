import styles from './Account.module.scss';
import { useMemo } from 'react';

export const Account = ({ user }) => {
	const position = useMemo(() => {
		switch (user.role) {
			case 'kid':
				return 'ученик';

			case 'methodist':
				return 'методист';

			case 'trainer':
				return 'тренер';
		}
	}, [user]);
	return (
		<div className={styles.accaunt_wrap}>
			<img
				src={require(`@assets/avatar/${user.avatar}`)}
				className={styles.avatar}
				alt=""
			/>
			<div>
				<p className={styles.profession}>{position}</p>
				<p className={styles.name}>{user.name}</p>
			</div>
		</div>
	);
};
