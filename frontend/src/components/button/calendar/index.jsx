import { useState } from 'react';
import { ReactComponent as CalendarIcon } from '@assets/svg/calendar_icon.svg';
import Button from '@components/button/Button';
import Calendar from '@components/calendar/calendar.block/Calendar';

export default function CalendarButton() {
	const [calendar, setCalendar] = useState(false);
	return (
		<>
			{calendar ? (
				<Calendar onHide={() => setCalendar(false)} />
			) : (
				<Button
					title="02.10.23 - 08.10.23"
					onClick={() => setCalendar(!calendar)}
				>
					<CalendarIcon />
				</Button>
			)}
		</>
	);
}
