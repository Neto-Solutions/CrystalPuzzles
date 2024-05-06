import Page from '@components/page/Page';
import UserCard from '@components/cards/user.card/User.card';

export default function ProgressGraphPage() {
	const tempArray = Array.from(
		{ length: 6 },
		() => 'Дмитриева Анастасия Алексеевна'
	);
	return (
		<Page title="График прогресса тренеров">
			{tempArray.map((item, index) => {
				return <UserCard key={index} name={item} />;
			})}
		</Page>
	);
}
