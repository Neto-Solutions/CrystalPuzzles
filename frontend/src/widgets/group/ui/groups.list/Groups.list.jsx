import styles from './Groups.list.module.scss';
import { Spinner } from '@shared/ui';
import { useEffect, useState } from 'react';
import { getAllGroups } from '@entities/group/api/group.api';
import { useNavigate } from 'react-router-dom';

export default function GroupsList() {
	const [groups, setGroups] = useState({});
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		getAllGroups()
			.then((res) => {
				setGroups(res);
			})
			.then(() => setLoading(false))
			.catch(() =>
				navigate('/login', { state: { from: window.location.pathname } })
			);
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
