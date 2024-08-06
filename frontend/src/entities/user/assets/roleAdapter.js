export default function roleAdapter(role) {
	switch (role) {
		case 'student':
			return 'ученик';

		case 'supervisor':
			return 'методист';

		case 'trainer':
			return 'тренер';

		default:
			return 'error';
	}
}
