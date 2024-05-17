import Page from '@shared/ui/page/Page';
import { UserCard } from '@features/card';
import { Link } from 'react-router-dom';

export default function ProgressGraphPage() {
	const tempArray = Array.from(
		{ length: 6 },
		() => 'Дмитриева Анастасия Алексеевна'
	);
	return (
		<Page title="График прогресса тренеров">
			{tempArray.map((_, index) => (
				<Link to="/progress/view" key={index}>
					<UserCard img={''} name="Дмитриева Анастасия Алексеевна" />
				</Link>
			))}
		</Page>
	);
}
