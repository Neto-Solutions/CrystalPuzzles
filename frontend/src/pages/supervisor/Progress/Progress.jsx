import styles from './Progress.module.scss';
import { Page, Button, UserCard } from '@shared/ui';
import { CalendarButton } from '@features/calendar';
import { Graph } from '@widgets/graph/ui/Graph';

export default function ProgressPage() {
	return (
		<Page title="График прогресса">
			<Graph />
			<div className={styles.buttons_container}>
				<UserCard img={''} name="Дмитриева Анастасия Алексеевна" />
				<CalendarButton />
				<Button title="Выгрузить" />
				<Button title="Открыть в Google doc" />
			</div>
		</Page>
	);
}
