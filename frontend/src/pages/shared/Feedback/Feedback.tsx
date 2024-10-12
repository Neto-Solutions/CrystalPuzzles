import { Button, Page } from '@shared/ui';
import { Feedback } from '@features';

interface FeedbackPageProps {
	title: string;
}

export default function FeedbackPage({ title }: FeedbackPageProps) {
	return (
		<Page title={title}>
			<Feedback placeholder="Антонина, поставь мне выходной на 30.10.2023, у меня прием у стоматолога." />
			<Button
				title="Отправить"
				bgColor="dark"
				style={{ marginLeft: 'auto', width: '347px' }}
			/>
		</Page>
	);
}
