import { Page } from '@shared/ui';
import { StudentsList } from '@widgets/student';
export default function StudentsListPage() {
	return (
		<Page title="Ученики">
			<StudentsList />
		</Page>
	);
}
