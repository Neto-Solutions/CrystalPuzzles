import styles from './Create.group.page.module.scss';
import PageContainer from '@components/page.container/Page.container';
import Button from '@components/button/Button';

export default function CreateGroupPage() {
	return (
		<div>
			<PageContainer.Header title="Создать группу" />
			<PageContainer.Body>
				<div className={styles.input_container}>
					<input
						className={styles.input_text}
						type="text"
						placeholder="Название группы"
					/>
					<input className={styles.input_checkbox} type="checkbox" />
				</div>
				<Button title="Ученики" width="347px" height="57px" />
			</PageContainer.Body>
		</div>
	);
}
