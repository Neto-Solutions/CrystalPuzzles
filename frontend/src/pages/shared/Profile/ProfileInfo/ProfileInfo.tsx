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
				<span>{moment(user.birthday).format('DD.MM.YYYY')}</span>
			</p>
			{user.extensions ? (
				<>
					<p className={styles.title}>
						Район проживания: <span>{user.extensions?.area}</span>
					</p>
					<p className={styles.title}>
						Сопровождающий: <span>{user.extensions?.accompanying}</span>
					</p>
					<p className={styles.title}>
						Номер телефона:
						<span>{user.contact}</span>
					</p>
					<p className={styles.title}>
						Особенности развития: <span>{user.extensions?.health_data}</span>
					</p>
					<p className={styles.title}>
						{' '}
						Не любит: <span>{user.extensions?.triggers}</span>
					</p>
				</>
			) : (
				''
			)}
		</div>
	);
}
