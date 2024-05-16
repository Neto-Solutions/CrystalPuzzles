import UserCard from '@shared/card/user.card/User.card';
import Page from '@shared/ui/page/Page';
import Button from '@shared/ui/button/Button';
import styles from './Analytics.view.page.module.scss';
import Card from '@shared/card/';
import avatar from '@assets/avatar/methodist.png';
import { useState } from 'react';
import CalendarButton from '../../components/button/calendar';

export default function AnalyticViewPage() {
	const [comment, setComment] = useState(false);

	return (
		<Page title="Аналитика">
			<UserCard img={avatar} name="Дмитриева Анастасия Алексеевна" showBtn>
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
