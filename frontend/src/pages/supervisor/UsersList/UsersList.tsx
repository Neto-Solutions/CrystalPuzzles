import { Page } from '@shared/ui';
import { UserCard } from '@shared/ui/card';
import { Link, useLoaderData } from 'react-router-dom';

export default function UsersListPage({ type }: any) {
	const users: any = useLoaderData();
	return (
		<Page title="График прогресса тренеров">
			{users.map((item: any, index: number) => (
				<Link to={`/${type}/${item._id}`} key={index}>
					<UserCard
						img={require(`assets/avatar/${item.avatar}.png`)}
						name={item.surname + ' ' + item.firstname + ' ' + item.lastname}
					/>
				</Link>
			))}
		</Page>
	);
}
