import avatar from '@assets/svg/avatar.svg';
import styles from './Account.module.scss';

export const Account = () => {
	return (
		<div className={styles.accaunt_wrap}>
			<img src={avatar} className={styles.avatar} alt="" />
			<div>
				<p className={styles.profession}>методист</p>
				<p className={styles.name}>Антонина</p>
			</div>
		</div>
	);
};
