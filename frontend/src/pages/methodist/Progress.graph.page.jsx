import "./Progress.graph.page.css";
import PageContainer from "../../components/page.container/Page.container";
import UserCard from "../../components/user.card/User.card";
import Title from "../../components/title/Title";

export default function ProgressGraphPage() {
	const tempArray = Array.from(
		{ length: 6 },
		() => "Дмитриева Анастасия Алексеевна",
	);
	return (
		<>
			<Title isHeading>График прогресса тренеров</Title>
			<PageContainer.Body>
				{tempArray.map((item, index) => {
					return <UserCard key={index} name={item} />;
				})}
			</PageContainer.Body>
		</>
	);
}
