import { Lesson } from '@shared/api';
import styles from './Info.module.scss';
import moment from 'moment';
import { useState, useEffect } from 'react';

export default function Info({ lessonId, className }: any) {
	const [data, setData] = useState<any>();

	useEffect(() => {
		getLesson();
	}, []);

	async function getLesson() {
		const [data, err] = await Lesson.getById(lessonId);
		if (err) return;
		setData(data);
	}
	return (
		<section className={styles.info_container + ' ' + className}>
			<div className={styles.date}>
				Дата:
				<span className={styles.date_value}>
					{data && moment(data.start).format('DD.MM.YYYY')}
				</span>
			</div>
			<div className={styles.place}>
				Площадка:
				<span className={styles.place_value}>{data && data.space.name}</span>
			</div>
		</section>
	);
}
