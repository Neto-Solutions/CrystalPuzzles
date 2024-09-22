import styles from './Progress.module.scss';
import { Page, Button, UserCard } from '@shared/ui';
import { CalendarButton } from '@features';
import { Graph } from './graph/Graph';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { serverUrl } from '@entities';
import joinName from 'entities/profile/assets/joinName';

interface ProgressPageProps {
	title: string;
}

export default function ProgressPage({ title }: ProgressPageProps) {
	const {
		state: { user }
	} = useLocation();
	const [date, setDate]: any = useState({
		from: new Date().toISOString(),
		to: new Date()
	});

	return (
		<Page title={title}>
			<Graph />
			<div className={styles.buttons_container}>
				<UserCard
					img={
						user.photo
							? serverUrl() + user.photo
							: require(`assets/avatar/${user.avatar || 0}.png`)
					}
					name={joinName(user)}
				/>
				<CalendarButton date={date} setDate={setDate} range />
				<Button title="Выгрузить" />
				<Button title="Открыть в Google doc" />
			</div>
		</Page>
	);
}
