import { Emoji } from '@features/emoji';
import { Page } from '@shared/ui';
import { Feedback } from '@features/feedback';

export default function AppraisalPage() {
	return (
		<Page title="Оценка">
			<Feedback>Оставить комментарий тренеру</Feedback>
			<Emoji />
		</Page>
	);
}
