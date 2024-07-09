import { Link } from 'react-router-dom';
import useResize from '@shared/hooks/useResize';
import { UserCard } from '@shared/ui/card';
import { Page } from '@shared/ui';
import { data } from '../../../mock/data'; // TODO: потом удалить
import styles from './AnalyticsContent.module.scss';

export const AnalyticsContent = () => {
	const isMobile = useResize('sm');
	return (
		<Page title="Аналитика тренеров">
			<div className={styles.cards_wrapper}>
				{data.map((user) => (
					<Link
						key={user.id}
						to="/analytic/view"
						state={{
							img: require(`@shared/assets/avatar/${user.avatar}.png`),
							firstname: `${user.firstname}`,
							lastname: `${user.lastname}`,
							surname: `${user.surname}`
						}}
					>
						<UserCard
							img={require(`@shared/assets/avatar/${user.avatar}.png`)}
							name={
								isMobile
									? `${user.firstname} ${user.surname}`
									: `${user.firstname} ${user.lastname} ${user.surname}`
							}
						/>
					</Link>
				))}
			</div>
		</Page>
	);
};
