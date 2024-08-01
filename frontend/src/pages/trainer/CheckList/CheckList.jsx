import styles from './CheckList.module.scss';
import { Page, Button, Spinner } from '@shared/ui';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getDataById } from '@entities/schedule';
import Profile from './Profile/Profile';
import Info from './Info/Info';
import Exercises from './Exercises/Exercises';

export default function CheckListPage() {
	const { pathname } = useLocation();
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	// eslint-disable-next-line no-unused-vars
	const [err, setErr] = useState(null);

	useEffect(() => {
		getDataById(pathname.split('/').pop())
			.then(setData)
			.finally(() => setIsLoading(false))
			.catch(setErr);
	}, []);

	return (
		<Page title="Чек-листы">
			<Spinner isLoading={isLoading}>
				<div className={styles.wrapper}>
					<Profile className={styles.profile} />
					{data && <Info className={styles.info} data={data} />}

					<section className={styles.panel_container}>
						<Button title="Выберите группу" downArrow width="100%" />
						<Button title="Выберите учеников" downArrow width="100%" />
						<Button title="Отправить чек-лист" width="100%" />
					</section>

					<Exercises className={styles.exercises} />
				</div>
			</Spinner>
		</Page>
	);
}
