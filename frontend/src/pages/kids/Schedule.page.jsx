import './Schedule.page.scss';
import Page from '@components/page/Page';
import Calendar from '@components/calendar/Calendar';
import Button from '@components/button/Button';
export default function SchedulePage() {
	const tempArray = Array.from({ length: 7 }, () => ({
		time: '10:15',
		name: ''
	}));
	return (
		<Page title="Расписание">
			<div className="schedule_table">
				{tempArray.map((item, index) => (
					<div key={index} className="schedule_table_row">
						<div className="schedule_table_row_item_time">{item.time}</div>
						<div className="schedule_table_row_item_name">{item.name}</div>
					</div>
				))}
			</div>
			<div className="shedule_page_calendar_container">
				<Calendar />
				<Button title="Записаться" />
			</div>
		</Page>
	);
}
