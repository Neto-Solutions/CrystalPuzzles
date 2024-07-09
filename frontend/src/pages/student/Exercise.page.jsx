import { ExerciseList } from '@features/exercise.list';
import { Page } from '@shared/ui';

export default function ExercisePage() {
	return (
		<Page title="Мои занятия">
			<ExerciseList />
		</Page>
	);
}
