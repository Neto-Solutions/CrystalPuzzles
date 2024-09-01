import { Page, Button } from '@shared/ui';
import GroupsList from './groups.list/Groups.list';
import { useLoaderData, useNavigate } from 'react-router-dom';
import styles from './GroupListPage.module.scss';

interface GroupListPageProps {
	title: string;
}

export default function GroupListPage({ title }: GroupListPageProps) {
	const { groups }: any = useLoaderData();
	const navigate = useNavigate();
	return (
		<Page title={title}>
			<div className={styles.container}>
				<GroupsList data={groups} className={styles.list} />
				<Button
					title="Создать группу"
					onClick={() => navigate('/group/create')}
					className={styles.btn}
				/>
			</div>
		</Page>
	);
}
