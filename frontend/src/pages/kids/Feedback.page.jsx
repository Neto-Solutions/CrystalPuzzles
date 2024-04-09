import './Feedback.page.css';
import PageContainer from '../../components/page.container/Page.container';
import ChooseButton from '../../components/button/Choose.button';
export default function FeedbackPage() {
	return (
		<>
			<PageContainer.Header title="Обратная связь" />
			<PageContainer.Body>
				<div className="feedback_form_container">
					<form className="feedback_form" action="">
						<div className="textarea_container">
							<div className="feedback_form_title">
								Оставить комментарий тренеру
							</div>
							<textarea className="feedback_form_textarea" name="" id="" />
						</div>
						<button className="feedback_form_send_button">
							Отправить комментарий
						</button>
					</form>
				</div>
				<ChooseButton />
			</PageContainer.Body>
		</>
	);
}
