import classNames from 'classnames';
import styles from './ProfileInfo.module.scss';

interface ProfileInfoProps {
	user: any;
	className?: string;
}

export default function ProfileInfo({ user, className }: ProfileInfoProps) {
	return (
		<div className={classNames(styles.container, className)}>
			<div>
				<span className={styles.title}>Дата рождения:</span>
				<span>{user.birthday}</span>
			</div>
			<div>
				<span className={styles.title}>Адрес проживания:</span>
			</div>
			<div>
				<span className={styles.title}>Сопровождающий:</span>
			</div>
			<div>
				<span className={styles.title}>Номер телефона:</span>
				<span>{user.contact}</span>
			</div>
			<div>
				<span className={styles.title}>Особенности развития: </span>
			</div>
			<div>
				<span className={styles.title}>Не любит: </span>
			</div>
		</div>
	);
}
