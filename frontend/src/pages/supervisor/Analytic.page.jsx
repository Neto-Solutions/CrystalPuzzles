import { UserCard } from '@shared/ui/card';
import { Page } from '@shared/ui';
import { Link } from 'react-router-dom';

export default function AnalyticPage() {
	const tempArray = Array.from(
		{ length: 6 },
		() => 'Дмитриева Анастасия Алексеевна'
	);

	return (
		<Page title="Аналитика тренеров">
			{tempArray.map((_, index) => (
				<Link key={index} to="/analytic/view">
					<UserCard img={''} name="Дмитриева Анастасия Алексеевна" />
				</Link>
			))}
		</Page>
	);
}
