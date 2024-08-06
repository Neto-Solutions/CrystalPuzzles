import { useEffect, useState } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import useResize from '@shared/hooks/useResize';
import { Page, Spinner } from '@shared/ui';
import { getDataById } from '@entities/lesson';
import { DateChanger } from '@features/DateChanger/DateChanger';
import ExerciseItem from '@shared/ui/ExerciseItem/ExerciseItem';
import styles from './Exercise.module.scss';

export default function ExercisePage() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	const { lesson, checkList} = useLoaderData();
	// eslint-disable-next-line no-unused-vars
	const [err, setErr] = useState(null);
	// const { pathname } = useLocation();
	const isTablet = useResize('md');

	// useEffect(() => {
	// 	getDataById(pathname.split('/').pop())
	// 		.then(setData)
	// 		.then(() => setIsLoading(false))
	// 		.catch(setErr);
	// }, [pathname]);

	return (
		<Page title="Мои занятия">
			{isTablet ? (
				<>
					<DateChanger className={styles.date} />
					<div className={styles.container}>
						<div className={styles.reward_wrapper}>
							<span>Мои награды</span>
						</div>
						<ul className={styles.list}>
							<Spinner isLoading={isLoading}>
								{data &&
									data.exercises.map((item, index) => (
										<ExerciseItem
											key={item._id}
											text={item.name}
											id={index + 1}
											img={item.img}
											defaultChecked={item.isComplete}
											// disabled={}
										/>
									))}
							</Spinner>
						</ul>
					</div>
				</>
			) : (
				<div className={styles.container}>
					<div>
						<DateChanger className={styles.date} />
						<ul className={styles.list}>
							<Spinner isLoading={isLoading}>
								{data &&
									data.exercises.map((item, index) => (
										<ExerciseItem
											key={item._id}
											text={item.name}
											id={index + 1}
											img={item.img}
											defaultChecked={item.isComplete}
											// disabled={}
										/>
									))}
							</Spinner>
						</ul>
					</div>
					<div className={styles.reward_wrapper}>
						<span>Мои награды</span>
					</div>
				</div>
			)}
		</Page>
	);
}
