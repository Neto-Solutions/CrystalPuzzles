import { Page } from '@shared/ui';
import { StudentsList } from '@widgets/student';

export default function ProfileList() {
	return (
		<Page title="Ученики">
			<StudentsList />
		</Page>
	);
}
