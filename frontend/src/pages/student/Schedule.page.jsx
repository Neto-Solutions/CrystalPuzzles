import { Page, Button } from '@shared/ui';
import { CalendarBlock } from '@features/calendar';
import { ScheduleTable } from '@features/schedule';

export default function SchedulePage() {

	return (
		<Page title="Расписание">
			<CalendarBlock/>
			<ScheduleTable/>
			<Button  width='335px' title="Выберите тренера" downArrow/>
		</Page>
	);
}
