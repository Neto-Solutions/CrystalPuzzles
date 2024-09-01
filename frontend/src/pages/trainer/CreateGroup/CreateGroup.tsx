import { Page } from '@shared/ui';
import GroupForm from './GroupForm/GroupForm';

interface CreateGroupPageProps {
	title: string;
}

export default function CreateGroupPage({ title }: CreateGroupPageProps) {
	return (
		<Page title={title}>
			<GroupForm />
		</Page>
	);
}
