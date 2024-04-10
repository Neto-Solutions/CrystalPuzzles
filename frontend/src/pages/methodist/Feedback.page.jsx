import './Feedback.page.css';
import PageContainer from '@components/page.container/Page.container';

export default function FeedbackPage() {
	return (
		<>
			<PageContainer.Header title="Обратная связь" />
			<PageContainer.Body>
				<div className="feedback_commentary_area_cont">
					<div className="feedback_comment_header">
						Оставить комментарий методисту
					</div>
					<div className="feedback_commentary_place">
						Антонина, поставь мне выходной на 30.10.2023, у меня прием у
						стоматолога.
					</div>
				</div>
				<div className="feedback_commentary_send_btn_cont">
					<button className="feedback_commentary_send_btn">Отправить</button>
				</div>
			</PageContainer.Body>
		</>
	);
}
