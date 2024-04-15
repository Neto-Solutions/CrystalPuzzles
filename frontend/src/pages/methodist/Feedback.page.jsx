import PageContainer from "../../components/page.container/Page.container";
import Title from "../../components/title/Title";
import Button from "../../components/button/Button";
import styles from "./Feedback.page.module.scss";

export default function FeedbackPage() {
	return (
		<>
			<Title isHeading>Обратная связь</Title>
			<PageContainer.Body>
				<div className={styles["feedback-wrap"]}>
					<Title tag='h2' className={styles["second-title"]}>
						Оставить комментарий методисту
					</Title>
					<textarea className={styles.textaria}>
						Антонина, поставь мне выходной на 30.10.2023, у меня прием у
						стоматолога.
					</textarea>
				</div>
				<Button className={styles["send-btn"]}>Отправить</Button>
			</PageContainer.Body>
		</>
	);
}
