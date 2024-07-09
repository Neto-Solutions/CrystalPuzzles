import { Page } from '@shared/ui';
import { Workout } from '@features/student.workout';

export default function TrainPage() {
	return (
		<Page title="Мои тренировки">
			<Workout />
		</Page>
	);
}
