import styles from './Analytics.module.scss';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Card, UserCard, Page, Button } from '@shared/ui';
import { CalendarButton } from '@features/calendar';

export default function AnalyticsPage() {
	const [comment, setComment] = useState(false);
	const { avatar, firstname, surname, lastname } = useLoaderData();

	return (
		<Page title="Аналитика">
			<UserCard
				img={require(`assets/avatar/${avatar}.png`)}
				name={surname + ' ' + firstname + ' ' + lastname}
				showBtn
			>
				<ul className={styles.list}>
					<li>Часов обучения</li>
					<li>Количество учеников</li>
					<li>Сложность групп</li>
				</ul>
			</UserCard>

			<Card className={styles.comment} onClick={() => setComment(!comment)}>
				{comment ? <p>Комментарий</p> : <p>Комментарий тренера</p>}
			</Card>

			<div className={styles.buttons}>
				<CalendarButton />
				<Button title="Выгрузить" />
				<Button title="Открыть в Google doc" />
			</div>
		</Page>
	);
}
