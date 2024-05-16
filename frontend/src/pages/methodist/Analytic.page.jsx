import UserCard from '@shared/card/user.card/User.card';
import Page from '@shared/ui/page/Page';
import { Link } from 'react-router-dom';
import avatar from '@assets/avatar/methodist.png';

export default function AnalyticPage() {
	const tempArray = Array.from(
		{ length: 6 },
		() => 'Дмитриева Анастасия Алексеевна'
	);

	return (
		<Page title="Аналитика тренеров">
			{tempArray.map((_, index) => (
				<Link key={index} to="/analytic/view">
					<UserCard img={avatar} name="Дмитриева Анастасия Алексеевна" />
				</Link>
			))}
		</Page>
	);
}
