import styles from './Schedule.page.module.scss';
import Page from '@components/page/Page';
import Calendar from '@components/calendar/Calendar';
import Button from '@components/button/Button';
import ScheduleTable from '@components/schedule.table.block/Schedule.table';

export default function SchedulePage() {
	return (
		<Page title="Расписание">
			<ScheduleTable />
			<aside className={styles.calendar}>
				<Calendar />
				<Button title="Записаться" />
			</aside>
		</Page>
	);
}
