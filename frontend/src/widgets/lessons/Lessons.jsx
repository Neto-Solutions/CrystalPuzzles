import styles from './Lessons.module.scss';
import { useEffect, useState } from 'react';
import { Spinner } from '../../shared/ui';
import { getAllData } from '@entities/schedule';
import ExerciseItem from '../../shared/ui/ExerciseItem/ExerciseItem';

export default function Lessons({ children }) {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState();

	useEffect(() => {
		getAllData()
			.then(setData)
			.then(() => setIsLoading(false))
			.catch(() => null);
	}, []);

	return (
		<div className={styles.container}>
			<div className="">
				{children}
				<ul className={styles.list}>
					<Spinner isLoading={isLoading}>
						{data?.exercises?.map((item, index) => (
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
		</div>
	);
}
