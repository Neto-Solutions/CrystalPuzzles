import { Link } from 'react-router-dom';
import styles from './UsersList.module.scss';

export default function UsersList({ users, ...props }: any) {
	return (
		<div className={styles.container} {...props}>
			{users?.map((user: any) => (
				<Link to={`./${user.id}`} key={user.id}>
					<div className={styles.item}>
						{user.surname + ' ' + user.firstname + ' ' + user.lastname}
					</div>
				</Link>
			))}
		</div>
	);
}
