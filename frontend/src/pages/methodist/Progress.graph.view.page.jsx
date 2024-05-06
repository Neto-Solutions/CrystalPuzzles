import styles from './Progress.graph.view.page.module.scss';
import Page from '@components/page/Page';
import UserCard from '@components/cards/user.card/User.card';
import Button from '@components/button/Button';
import calendar_icon from '@assets/svg/calendar_icon.svg';
import { ReactComponent as Chart } from '@assets/svg/chart.svg';

export default function ProgressGraphViewPage() {
	return (
		<Page title="График прогресса">
			<Chart />
			<div className={styles.buttons_container}>
				<UserCard name="Дмитриева Анастасия Алексеевна">
					<div className={styles.link}>Показать</div>
				</UserCard>
				<Button className={`${styles.btn} ${styles.calendar}`}>
					<span className={styles.date}>02.10.23 - 08.10.23</span>
					<img className={styles['date-icon']} src={calendar_icon} alt="" />
				</Button>

				<Button title="Выгрузить" />
				<Button title="Открыть в Google doc" />
			</div>
		</Page>
	);
}
