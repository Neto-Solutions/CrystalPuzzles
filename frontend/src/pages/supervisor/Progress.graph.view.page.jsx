import styles from './Progress.graph.view.page.module.scss';
import Page from '@shared/ui/page/Page';
import { UserCard } from '@shared/card';
import Button from '@shared/ui/button/Button';
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
