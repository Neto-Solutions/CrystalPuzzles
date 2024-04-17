import './Appraisal.page.scss';
import PageContainer from '@components/page.container/Page.container';
import ChooseButton from '@components/button/Choose.button';
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
						<ChooseButton />
						<div className="emoji_container"></div>
						<ChooseButton />
					</div>
				</form>
			</PageContainer.Body>
		</>
	);
}
