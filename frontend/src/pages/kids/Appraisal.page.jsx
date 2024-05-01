import './Appraisal.page.scss';
import PageContainer from '@components/page.container/Page.container';
import Button from '@components/button/Button';
export default function AppraisalPage() {
	return (
		<>
			<PageContainer.Header title="Оценка" />
			<PageContainer.Body>
				<form className="appraisal_form">
					<div className="appraisal_form_textarea_container">
						<div className="appraisal_form_title">
							Оставить комментарий тренеру
						</div>
						<textarea className="appraisal_form_textarea" name="" id="" />
					</div>
					<div className="appraisal_form_buttons">
						<Button title="Отправить" />
						<div className="emoji_container"></div>
						<Button title="Отменить" />
					</div>
				</form>
			</PageContainer.Body>
		</>
	);
}
