import { Page } from '@shared/ui';
import { StudentsList } from '@widgets/student';

export default function ProfileList({ title }) {
	return (
		<Page title={title}>
			<StudentsList />
		</Page>
	);
}
