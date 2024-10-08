import { useNavigate } from 'react-router-dom';
import styles from './UsersList.module.scss';

export default function UsersList({ users, ...props }: any) {
	const navigate = useNavigate();

	return (
		<div className={styles.container} {...props}>
			{users?.map((user: any) => (
				<div
					onClick={() => navigate(`./${user.id}`, { state: { user } })}
					key={user.id}
				>
					<div className={styles.item}>
						{user.surname + ' ' + user.firstname + ' ' + user.lastname}
					</div>
				</div>
			))}
		</div>
	);
}
