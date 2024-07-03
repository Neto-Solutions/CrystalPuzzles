import { useState } from 'react';
//import { ReactComponent as CalendarIcon } from '@shared/assets/svg/calendar_icon.svg';
import { Button } from '@shared/ui';
import Calendar from '../calendar.block/Calendar';

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
					{/* <CalendarIcon /> */}
				</Button>
			)}
		</>
	);
}
