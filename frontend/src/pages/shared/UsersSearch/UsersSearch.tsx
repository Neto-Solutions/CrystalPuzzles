import styles from './UsersSearch.module.scss';
import { useState } from 'react';
import { Page } from '@shared/ui';
import Search from './search/Search';
import UsersList from './usersList/UsersList';

export default function UsersSearchPage({ title }: any) {
	const [users, setUsers]: any = useState([]);

	return (
		<Page title={title}>
			<div className={styles.container}>
				<Search setUsers={setUsers} />
				{users.length ? <UsersList users={users} /> : null}
			</div>
		</Page>
	);
}
