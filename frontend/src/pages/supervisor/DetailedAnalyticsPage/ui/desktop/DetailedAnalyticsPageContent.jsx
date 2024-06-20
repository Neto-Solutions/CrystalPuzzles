import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, UserCard, Page, Button } from '@shared/ui';
import { CalendarButton } from '@features/calendar';
import styles from './DetailedAnalyticsPageContent.module.scss';

export const DetailedAnalyticsPageContent = () => {
	const [comment, setComment] = useState(false);
	const location = useLocation();
	const { img, firstname, surname, lastname } = location.state;

	return (
		<Page title="Аналитика">
			<UserCard img={img} name={`${firstname} ${lastname} ${surname}`} showBtn>
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
};
