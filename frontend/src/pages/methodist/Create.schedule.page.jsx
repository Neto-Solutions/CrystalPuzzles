import Page from '@components/page/Page';
import Button from '@components/button/Button';
import styles from './Create.schedule.page.module.scss';
import CalendarTable from '@components/calendar/calendar.table/Calendar.table';

export default function CreateShedulePage() {
	return (
		<Page title="Составить расписание тренеров">
			<CalendarTable />
			<div className={styles.buttons_container}>
				<Button title="Выберите тренера" downArrow />
				<Button title="Выберите площадку" downArrow />
				<Button title="Отправить расписание" />
			</div>
		</Page>
	);
}
