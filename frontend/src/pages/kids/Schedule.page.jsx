import styles from './Schedule.page.module.scss';
import Page from '@components/page/Page';
import Calendar from '@components/calendar/calendar.block/Calendar';
import Button from '@components/button/Button';
import ScheduleTable from '@components/schedule/schedule.table/Schedule.table';
export default function SchedulePage() {
	return (
		<Page title="Расписание">
			<ScheduleTable />
			<div className={styles.calendar}>
				<Calendar />
				<Button title="Записаться" />
			</div>
		</Page>
	);
}
