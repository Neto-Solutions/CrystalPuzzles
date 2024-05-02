import styles from './Schedule.page.module.scss';
import PageContainer from '@components/page.container/Page.container';
import Calendar from '@components/calendar/Calendar';
import Button from '@components/button/Button';
import ScheduleTable from '@components/schedule.table.block/Schedule.table';

export default function SchedulePage() {
	return (
		<>
			<PageContainer.Header title="Расписание" />
			<PageContainer.Body>
				<ScheduleTable />
				<aside className={styles.calendar}>
					<Calendar />
					<Button title="Записаться" />
				</aside>
			</PageContainer.Body>
		</>
	);
}
