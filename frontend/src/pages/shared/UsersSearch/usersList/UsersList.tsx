import { useNavigate } from 'react-router-dom';
import styles from './UsersList.module.scss';
import joinName from 'entities/profile/assets/joinName';

export default function UsersList({ users, ...props }: any) {
	const navigate = useNavigate();

	return (
		<div className={styles.container} {...props}>
			{users?.map((user: any) => (
				<div
					key={user.id}
					className={styles.item}
					onClick={() => navigate(`./${user.id}`, { state: { user } })}
				>
					{joinName(user)}
				</div>
			))}
		</div>
	);
}
