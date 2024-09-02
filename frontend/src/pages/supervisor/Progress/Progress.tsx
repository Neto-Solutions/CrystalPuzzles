import styles from './Progress.module.scss';
import { Page, Button, UserCard } from '@shared/ui';
import { CalendarButton } from '@features';
import { Graph } from './graph/Graph';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';

interface ProgressPageProps {
	title: string;
}

export default function ProgressPage({ title }: ProgressPageProps) {
	const { avatar, firstname, lastname, surname }: any = useLoaderData();
	const [date, setDate]: any = useState({
		from: new Date().toISOString(),
		to: new Date().toISOString()
	});
	return (
		<Page title={title}>
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
