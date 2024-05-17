import styles from './Progress.graph.view.page.module.scss';
import Page from '@shared/ui/page/Page';
import { UserCard } from '@features/card';
import Button from '@shared/ui/button/Button';
import { CalendarButton } from '@features/calendar';

export default function ProgressGraphViewPage() {
	return (
		<Page title="График прогресса">
			<div className={styles.buttons_container}>
				<UserCard img={''} name="Дмитриева Анастасия Алексеевна" />

				<CalendarButton />
				<Button title="Выгрузить" />
				<Button title="Открыть в Google doc" />
			</div>
		</Page>
	);
}
