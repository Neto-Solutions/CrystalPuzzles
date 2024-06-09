import { Page, Button } from '@shared/ui';
import { StudentFeedback } from '@features/feedback';

export default function FeedbackPage() {
	return (
		<Page title="Обратная связь">
			<StudentFeedback />
			<Button width="387px" title="Выберите тренера" downArrow />
		</Page>
	);
}
