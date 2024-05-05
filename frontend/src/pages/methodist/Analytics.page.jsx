import UserCard from '@components/user.card/User.card';
import Page from '@components/page/Page';

export default function AnalyticsPage() {
	const tempArray = Array.from(
		{ length: 6 },
		() => 'Дмитриева Анастасия Алексеевна'
	);

	return (
		<Page title="Аналитика тренеров">
			{tempArray.map((item, index) => {
				return <UserCard key={index} name={item} />;
			})}
		</Page>
	);
}
