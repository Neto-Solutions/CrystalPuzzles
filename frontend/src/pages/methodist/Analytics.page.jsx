import UserCard from "../../components/user.card/User.card";
import PageContainer from "../../components/page.container/Page.container";
import Title from "../../components/title/Title";

export default function AnalyticsPage() {
	const tempArray = Array.from(
		{ length: 6 },
		() => "Дмитриева Анастасия Алексеевна",
	);

	return (
		<>
			<Title isHeading>Аналитика тренеров</Title>
			<PageContainer.Body>
				{tempArray.map((item, index) => {
					return <UserCard key={index} name={item} />;
				})}
			</PageContainer.Body>
		</>
	);
}
