import styles from './CheckList.module.scss';
import avatar from '@shared/assets/avatar/0.png';
import { Page, Button, Spinner } from '@shared/ui';
import LS from '@shared/lib/localStorage';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '@entities/user';
import { getDataById } from '@entities/schedule';
import moment from 'moment';

export default function CheckListPage() {
	const [userPhoto, setUserPhoto] = useState(LS.get('avatar') || avatar);
	const user = useSelector(selectUser);

	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	// eslint-disable-next-line no-unused-vars
	const [err, setErr] = useState(null);
	const { pathname } = useLocation();

	useEffect(() => {
		getDataById(pathname.split('/').pop())
			.then(setData)
			.finally(() => setIsLoading(false))
			.catch(setErr);
	}, []);

	useEffect(() => {
		if (user.avatar) {
			setUserPhoto(require(`@shared/assets/avatar/${user.avatar}.png`));
			return;
		}
	}, [user]);

	return (
		<Page title="Чек-листы">
			<Spinner isLoading={isLoading}>
				<div className={styles.wrapper}>
					<section className={styles.profile_container}>
						<img src={userPhoto} alt="" className={styles.avatar} />
						<div className={styles.name_container}>
							<div className={styles.name}>
								{user.surname} {user.firstname}
							</div>
						</div>
					</section>

					<section className={styles.info_container}>
						<div className={styles.date}>
							Дата:
							<span className={styles.date_value}>
								{data && moment(data.start).format('DD.MM.YYYY')}
							</span>
						</div>
						<div className={styles.place}>
							Площадка:
							<span className={styles.place_value}>
								{data && data.place.name}
							</span>
						</div>
					</section>

					<section className={styles.panel_container}>
						<Button title="Выберите учеников" downArrow width="100%" />
						<Button title="Выберите группу" downArrow width="100%" />
						<Button title="Отправить чек-лист" width="100%" />
					</section>

					<section className={styles.exercises_container}></section>
				</div>
			</Spinner>
		</Page>
	);
}
