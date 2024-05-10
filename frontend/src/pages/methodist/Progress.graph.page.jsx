import Page from '@components/page/Page';
import UserCard from '@components/card/user.card/User.card';
import avatar from '@assets/img/methodist_img.jpg';
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
					<UserCard img={avatar} name="Дмитриева Анастасия Алексеевна" />
				</Link>
			))}
		</Page>
	);
}
