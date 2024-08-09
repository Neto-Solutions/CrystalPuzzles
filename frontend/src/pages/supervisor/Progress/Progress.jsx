import styles from './Progress.module.scss';
import { Page, Button, UserCard } from '@shared/ui';
import { CalendarButton } from '@features';
import { Graph } from './graph/Graph';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';

export default function ProgressPage() {
	const { avatar, firstname, lastname, surname } = useLoaderData();
	const [date, setDate] = useState({
		from: new Date().toISOString(),
		to: new Date().toISOString()
	});
	return (
		<Page title="График прогресса">
			<Graph />
			<div className={styles.buttons_container}>
				<UserCard
					img={require(`assets/avatar/${avatar}.png`)}
					name={surname + ' ' + firstname + ' ' + lastname}
				/>
				<CalendarButton date={date} setDate={setDate} range />
				<Button title="Выгрузить" />
				<Button title="Открыть в Google doc" />
			</div>
		</Page>
	);
}
