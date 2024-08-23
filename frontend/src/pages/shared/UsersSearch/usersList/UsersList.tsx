import { Link } from 'react-router-dom';
import styles from './UsersList.module.scss';

export default function UsersList({ users, ...props }) {
	return (
		<div className={styles.container} {...props}>
			{users?.map((user) => (
				<Link to={`./${user._id}`} key={user._id}>
					<div className={styles.item}>
						{user.surname + ' ' + user.firstname + ' ' + user.lastname}
					</div>
				</Link>
			))}
		</div>
	);
}
