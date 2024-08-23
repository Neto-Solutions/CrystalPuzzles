export default function roleAdapter(role: string) {
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
