import styles from './Groups.page.module.scss';
import Page from '@shared/ui/page/Page';
import Button from '@shared/ui/button/Button';
import { useEffect, useState } from 'react';
import { getAllGroups } from '../../entities/group/api/group.api';
import { useNavigate } from 'react-router-dom';

export default function TeamsPage() {
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
		<Page title="Группы" isLoading={loading}>
			<div className={styles.container}>
				{groups.records?.map((item) => (
					<div className={styles.group} key={item.id}>
						{item.id} группа {item.name}
					</div>
				))}
			</div>
			<Button
				title="Создать группу"
				width="347px"
				height="57px"
				onClick={() => navigate('/group/create')}
			/>
		</Page>
	);
}
