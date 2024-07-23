import { Page, Button } from '@shared/ui';
import { GroupsList } from '@widgets/group';
import { useNavigate } from 'react-router-dom';
export default function TeamsPage() {
	const navigate = useNavigate();
	return (
		<Page title="Группы">
			<GroupsList />
			<Button
				title="Создать группу"
				width="347px"
				height="57px"
				onClick={() => navigate('/group/create')}
			/>
		</Page>
	);
}
