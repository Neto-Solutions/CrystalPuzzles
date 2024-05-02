import './Appraisal.page.scss';
import Page from '@components/page/Page';
import Button from '@components/button/Button';
export default function AppraisalPage() {
	return (
		<Page title="Оценка">
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
		</Page>
	);
}
