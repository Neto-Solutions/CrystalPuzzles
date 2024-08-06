import styles from './Groups.list.module.scss';
import { useState } from 'react';

export default function GroupsList() {
	// eslint-disable-next-line no-unused-vars
	const [groups, setGroups] = useState({});

	return (
		<div className={styles.container}>
			{groups.records?.map((item) => (
				<div className={styles.group} key={item.id}>
					{item.id} группа {item.name}
				</div>
			))}
		</div>
	);
}
