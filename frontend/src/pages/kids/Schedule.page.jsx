import './Schedule.page.css';
import PageContainer from '../../components/page.container/Page.container';
import Calendar from '../../components/calendar/Calendar';
import { ReactComponent as DownArrow } from '../../assets/svg/calendar_arrow_down.svg';
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
					<button className="shedule_page_calendar_btn">
						Выберите тренера
						<DownArrow className="shedule_page_calendar_btn_arrow" />
					</button>
				</div>
			</PageContainer.Body>
		</>
	);
}
