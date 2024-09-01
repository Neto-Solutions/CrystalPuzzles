import { Page } from '@shared/ui';
import { UserCard } from '@shared/ui/card';
import joinName from 'entities/profile/assets/joinName';
import { Link, useLoaderData } from 'react-router-dom';

interface UsersListPageProps {
	type?: any;
	title: string;
}

export default function UsersListPage({ type, title }: UsersListPageProps) {
	const users: any = useLoaderData();
	return (
		<Page title={title}>
			{users.map((item: any, index: number) => (
				<Link to={`/${type}/${item.id}`} key={index}>
					<UserCard
						img={require(`assets/avatar/${item.avatar}.png`)}
						name={joinName(item)}
					/>
				</Link>
			))}
		</Page>
	);
}
