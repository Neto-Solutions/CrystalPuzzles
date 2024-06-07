import styles from './Progress.graph.view.page.module.scss';
import { Page } from '@shared/ui';
import { UserCard } from '@shared/ui/card';
import { Button } from '@shared/ui';
import { CalendarButton } from '@features/calendar';
import { Graph } from '@widgets/graph/ui/Graph';

export default function ProgressGraphViewPage() {
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
