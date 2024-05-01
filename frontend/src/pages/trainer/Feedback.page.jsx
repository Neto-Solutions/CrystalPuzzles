import './Feedback.page.scss';
import PageContainer from '@components/page.container/Page.container';
import Button from '@components/button/Button';

export default function FeedbackPage() {
	return (
		<>
			<PageContainer.Header title="Обратная связь" />
			<PageContainer.Body>
				<div className="feedback_form_container">
					<form className="feedback_form" action="">
						<div className="trainer_textarea_container">
							<div className="feedback_form_title">
								Оставить комментарий методисту
							</div>
							<textarea className="feedback_form_textarea" name="" id="" />
						</div>
						<Button title="Отправить" className="feedback_form_send_button" />
					</form>
				</div>
			</PageContainer.Body>
		</>
	);
}
