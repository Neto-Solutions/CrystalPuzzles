import styles from './Progress.module.scss';
import { Page, Button, UserCard } from '@shared/ui';
import { CalendarButton } from '@features/calendar';
import { Graph } from '@widgets/graph/ui/Graph';
import { useLoaderData } from 'react-router-dom';

export default function ProgressPage() {
	const { avatar, firstname, lastname, surname } = useLoaderData();
	return (
		<Page title="График прогресса">
			<Graph />
			<div className={styles.buttons_container}>
				<UserCard
					img={require(`assets/avatar/${avatar}.png`)}
					name={surname + ' ' + firstname + ' ' + lastname}
				/>
				<CalendarButton />
				<Button title="Выгрузить" />
				<Button title="Открыть в Google doc" />
			</div>
		</Page>
	);
}
