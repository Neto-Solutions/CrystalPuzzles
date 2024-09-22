import styles from './Analytics.module.scss';
import { useState } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import { Card, UserCard, Page, Button } from '@shared/ui';
import { CalendarButton } from '@features';
import { serverUrl } from '@entities';
import joinName from 'entities/profile/assets/joinName';

interface AnalyticsPageProps {
	title: string;
}

export default function AnalyticsPage({ title }: AnalyticsPageProps) {
	const {
		state: { user }
	} = useLocation();
	const [comment, setComment]: any = useState(false);
	const [date, setDate]: any = useState({
		from: new Date().toISOString(),
		to: new Date()
	});

	return (
		<Page title={title}>
			<UserCard
				img={
					user.photo
						? serverUrl() + user.photo
						: require(`assets/avatar/${user.avatar || 0}.png`)
				}
				name={joinName(user)}
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
				<CalendarButton date={date} setDate={setDate} range />
				<Button title="Выгрузить" />
				<Button title="Открыть в Google doc" />
			</div>
		</Page>
	);
}
