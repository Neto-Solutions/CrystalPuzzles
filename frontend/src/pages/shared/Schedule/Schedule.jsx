import { Page, Button, Wrapper } from '@shared/ui';
import { CalendarBlock } from '@features/calendar';
import { ScheduleTable } from '@features/schedule';
import { useState, useEffect } from 'react';

export default function SchedulePage() {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 425);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<Page title="Расписание">
			{isMobile ? (
				<Wrapper>
					<CalendarBlock />
					<ScheduleTable />
					<Button width="335px" title="Выберите тренера" downArrow />
				</Wrapper>
			) : (
				<>
					<ScheduleTable />
					<Wrapper>
						<CalendarBlock />
						<Button width="335px" title="Выберите тренера" downArrow />
					</Wrapper>
				</>
			)}
		</Page>
	);
}
