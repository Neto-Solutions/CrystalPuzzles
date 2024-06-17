import { UserCard } from '@shared/ui/card';
import { Page } from '@shared/ui';
import { Link } from 'react-router-dom';
import user from '../../shared/assets/avatar/1.png';
// import useResize from '../../shared/hooks/useResize';

export default function AnalyticPage() {
	const tempArray = Array.from(
		{ length: 6 },
		() => 'Дмитриева Анастасия Алексеевна'
	);
	// const { isMobile } = useResize('sm');

	return (
		<Page title="Аналитика тренеров">
			<div>
				{tempArray.map((_, index) => (
					<Link key={index} to="/analytic/view">
						<UserCard img={user} name="Дмитриева Анастасия Алексеевна" />
					</Link>
				))}
			</div>
		</Page>
	);
}
