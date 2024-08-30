import { Page, Button } from '@shared/ui';
import GroupsList from './groups.list/Groups.list';
import { useLoaderData, useNavigate } from 'react-router-dom';
import styles from './GroupListPage.module.scss';

export default function GroupListPage() {
	const { groups }: any = useLoaderData();
	const navigate = useNavigate();
	return (
		<Page title="Группы">
			<div className={styles.container}>
				<GroupsList data={groups} className={styles.list} />
				<Button
					title="Создать группу"
					// width="347px"
					// height="57px"
					onClick={() => navigate('/group/create')}
					className={styles.btn}
				/>
			</div>
		</Page>
	);
}
