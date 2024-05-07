import styles from './Create.group.page.module.scss';
import Page from '@components/page/Page';
import Button from '@components/button/Button';

export default function CreateGroupPage() {
	return (
		<Page title="Создать группу">
			<div className={styles.input_container}>
				<input
					className={styles.input_text}
					type="text"
					placeholder="Название группы"
				/>
				<input className={styles.input_checkbox} type="checkbox" />
			</div>
			<Button title="Ученики" width="347px" height="57px" />
		</Page>
	);
}
