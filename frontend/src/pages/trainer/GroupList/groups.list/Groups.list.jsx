import styles from './Groups.list.module.scss';
import { Spinner } from '@shared/ui';
import { useEffect, useState } from 'react';
import { getAllGroups } from '@entities/group/api/group.api';

export default function GroupsList() {
	const [groups, setGroups] = useState({});
	// eslint-disable-next-line no-unused-vars
	const [err, setErr] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAllGroups()
			.then(setGroups)
			.then(() => setLoading(false))
			.catch(setErr);
	}, []);

	return (
		<Spinner loading={loading}>
			<div className={styles.container}>
				{groups.records?.map((item) => (
					<div className={styles.group} key={item.id}>
						{item.id} группа {item.name}
					</div>
				))}
			</div>
		</Spinner>
	);
}
