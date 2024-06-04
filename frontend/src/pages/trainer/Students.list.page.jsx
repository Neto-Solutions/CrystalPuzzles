import Page from '@shared/ui/page/Page';
import { StudentsList } from '@widgets/student';
export default function StudentsListPage() {
	return (
		<Page title="Ученики">
			<StudentsList />
		</Page>
	);
}
