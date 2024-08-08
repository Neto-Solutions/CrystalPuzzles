import { Page, Button } from '@shared/ui';
import GroupsList from './groups.list/Groups.list';
import { useLoaderData, useNavigate } from 'react-router-dom';
export default function TeamsPage() {
	const { groups } = useLoaderData();
	const navigate = useNavigate();
	return (
		<Page title="Группы">
			<GroupsList data={groups} />
			<Button
				title="Создать группу"
				width="347px"
				height="57px"
				onClick={() => navigate('/group/create')}
			/>
		</Page>
	);
}
