import { Page, Button } from '@shared/ui';
import GroupsList from './groups.list/Groups.list';
import { useNavigate } from 'react-router-dom';
import styles from './GroupListPage.module.scss';

export default function GroupListPage() {
	const navigate = useNavigate();
	return (
		<Page title="Группы">
			<div className={styles.container}>
				<GroupsList className={styles.list} />
				<Button
					title="Создать группу"
					onClick={() => navigate('/group/create')}
					className={styles.btn}
				/>
			</div>
		</Page>
	);
}
