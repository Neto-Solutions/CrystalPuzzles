import './Schedule.page.scss';
import PageContainer from '@components/page.container/Page.container';
import Calendar from '@components/calendar/Calendar';
import ChooseButton from '@components/button/Choose.button';

export default function SchedulePage() {
	const tempArray = Array.from({ length: 7 }, () => ({
		time: '10:15',
		name: ''
	}));
	return (
		<>
			<PageContainer.Header title="Расписание" />
			<PageContainer.Body>
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
					<ChooseButton />
				</div>
			</PageContainer.Body>
		</>
	);
}
