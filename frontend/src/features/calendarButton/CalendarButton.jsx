import { useState } from 'react';
import moment from 'moment';
import { ReactComponent as CalendarIcon } from '@shared/assets/svg/calendar_icon.svg';
import { Button } from '@shared/ui';
import CalendarBlock from '../calendarBlock/CalendarBlock';

export default function CalendarButton({ date, setDate }) {
	const [calendar, setCalendar] = useState(false);
	return (
		<>
			{calendar ? (
				<CalendarBlock
					date={date}
					setDate={setDate}
					onHide={() => setCalendar(false)}
				/>
			) : (
				<Button
					title={
						moment(date.from).format('DD.MM.YYYY') +
						' - ' +
						moment(date.to).format('DD.MM.YYYY')
					}
					onClick={() => setCalendar(!calendar)}
					width="347px"
					height="57px"
				>
					<CalendarIcon />
				</Button>
			)}
		</>
	);
}
