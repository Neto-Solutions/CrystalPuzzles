import { serverUrl } from '@entities';
import { User } from '@shared/api';
import { Page } from '@shared/ui';
import { UserCard } from '@shared/ui/card';
import joinName from 'entities/profile/assets/joinName';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UsersListPageProps {
	type?: any;
	title: string;
}

export default function UsersListPage({ type, title }: UsersListPageProps) {
	const [trainers, setTrainers] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		getTrainers();
	}, []);

	async function getTrainers() {
		const [data, err] = await User.getTrainers();
		if (err) return;
		setTrainers(data.map((item: any) => ({ ...item, name: joinName(item) })));
	}
	return (
		<Page title={title}>
			{trainers.map((user: any, index: number) => (
				<div
					key={index}
					onClick={() => navigate(`/${type}/${user.id}`, { state: { user } })}
				>
					<UserCard
						img={
							user.photo
								? serverUrl() + user.photo
								: require(`assets/avatar/${user.avatar || 0}.png`)
						}
						name={joinName(user)}
					/>
				</div>
			))}
		</Page>
	);
}
