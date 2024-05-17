import Page from '@shared/ui/page/Page';
import { Feedback } from '@widgets/feedback';

export default function FeedbackPage() {
	return (
		<Page title="Обратная связь">
			<Feedback placeholder="Антонина, поставь мне выходной на 30.10.2023, у меня прием у стоматолога." />
		</Page>
	);
}
