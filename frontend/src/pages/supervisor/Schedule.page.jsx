import { Page } from '@shared/ui';
import CalendarTable from '@widgets/calendar.table';

export default function SchedulePage() {
	return (
		<Page title="Расписание тренеров">
			<CalendarTable />
		</Page>
	);
}
