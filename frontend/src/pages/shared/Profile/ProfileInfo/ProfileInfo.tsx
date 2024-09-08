import classNames from 'classnames';
import styles from './ProfileInfo.module.scss';

interface ProfileInfoProps {
	user: any;
	className?: string;
}

export default function ProfileInfo({ user, className }: ProfileInfoProps) {
	return (
		<div className={classNames(styles.container, className)}>
			<p className={styles.title}>
				Дата рождения:
				<span>{user.birthday}</span>
			</p>
			<p className={styles.title}> Адрес проживания:</p>
			<p className={styles.title}> Сопровождающий:</p>
			<p className={styles.title}>
				Номер телефона:
				<span>{user.contact}</span>
			</p>
			<p className={styles.title}>Особенности развития:</p>
			<p className={styles.title}> Не любит:</p>
		</div>
	);
}
