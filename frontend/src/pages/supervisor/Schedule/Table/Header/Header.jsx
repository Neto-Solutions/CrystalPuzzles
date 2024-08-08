import { ScheduleHeader } from '@features/scheduleHeader/ScheduleHeader';

export default function Header({ startDate, setStartDate }) {
	const generateHeader = () => {
		const endDate = startDate.clone().add(13, 'days');

		const startMonth = startDate.format('MMMM YYYY');
		const capitalizedStartMonth =
			startMonth.charAt(0).toUpperCase() + startMonth.slice(1);

		const endMonth = endDate.format('MMMM YYYY');
		const capitalizedEndMonth =
			endMonth.charAt(0).toUpperCase() + endMonth.slice(1);

		if (startDate.month() === endDate.month()) {
			return capitalizedStartMonth;
		} else {
			return `${capitalizedStartMonth} - ${capitalizedEndMonth}`;
		}
	};

	return (
		<ScheduleHeader
			date={generateHeader(startDate)}
			onPrevClick={() =>
				setStartDate((prev) => prev.clone().subtract(14, 'days'))
			}
			onNextClick={() => setStartDate((prev) => prev.clone().add(14, 'days'))}
		/>
	);
}
