import classNames from 'classnames';
import styles from './ProfileInfo.module.scss';
import moment from 'moment';

interface ProfileInfoProps {
	user: any;
	className?: string;
}

export default function ProfileInfo({ user, className }: ProfileInfoProps) {
	return (
		<div className={classNames(styles.container, className)}>
			<p className={styles.title}>
				Дата рождения:
				<span className={styles.birthday}>
					{moment(user.birthday).format('DD.MM.YYYY')}
				</span>
			</p>
			<p className={styles.title}>
				Email:
				<span className={styles.birthday}>{user.email}</span>
			</p>
			{/* <p className={styles.title}> Адрес проживания:</p>
			<p className={styles.title}> Сопровождающий:</p>
			<p className={styles.title}>
				Номер телефона:
				<span>{user.contact}</span>
			</p>
			<p className={styles.title}>Особенности развития:</p>
			<p className={styles.title}> Не любит:</p> */}
		</div>
	);
}
