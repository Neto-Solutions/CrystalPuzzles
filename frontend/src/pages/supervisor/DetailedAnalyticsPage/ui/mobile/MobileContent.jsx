import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, UserCard, Page, Button } from '@shared/ui';
import { CalendarButton } from '@features/calendar';
import styles from './MobileContent.module.scss';

export const MobileContent = () => {
	const [comment, setComment] = useState(false);
	const location = useLocation();
	const { img, firstname, surname } = location.state;

	return (
		<Page title="Аналитика">
			<div className={styles.wrapper}>
				<UserCard img={img} name={`${firstname} ${surname}`} showBtn>
					<ul className={styles.list}>
						<li>Часов обучения</li>
						<li>Количество учеников</li>
						<li>Сложность групп</li>
					</ul>
				</UserCard>

				<Card className={styles.comment} onClick={() => setComment(!comment)}>
					{comment ? <p>Комментарий</p> : <p>Комментарий тренера</p>}
				</Card>
			</div>

			<div className={styles.buttons}>
				<CalendarButton />
				<Button title="Выгрузить" width="100%" />
				<Button title="Открыть в Google doc" width="100%" />
			</div>
		</Page>
	);
};
