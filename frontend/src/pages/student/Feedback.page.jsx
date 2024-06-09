import { Page, Button } from '@shared/ui';
import { Feedback } from '@features/feedback';
import { Wrapper } from '@shared/ui';
export default function FeedbackPage() {
	return (
		<Page title="Обратная связь">
			<Wrapper width="100%" max_width="714px">
				<Feedback>Оставить комментарий тренеру</Feedback>
				<Button title="Отправить комментарий" width="100%" />
			</Wrapper>

			<Button width="347px" height="57px" title="Выберите тренера" downArrow />
		</Page>
	);
}
