export default function ScheduleRouteTo(status: string) {
	switch (status) {
		case 'in_editing':
			return '/exercise/';
		case 'created':
			return '/schedule/';
		default:
			return '';
	}
}
