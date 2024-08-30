import styles from './DaysList.module.scss';
import classNames from 'classnames';
import { Button } from '../Button/Button';
import moment, { Moment } from 'moment';
import { useState, useEffect } from 'react';
import { Lesson } from '@shared/api';

export default function DaysList({ setModalActive, edit, date }: any) {
	const [data, setData] = useState<any>({});

	useEffect(() => {
		const obj = initData(date);
		Lesson.get({
			start: date.clone().toISOString(),
			end: date.clone().add(13, 'days').toISOString()
		})
			.then((res) => {
				res.forEach((item: any) => {
					const key = moment(item.start).format('YYYY-MM-DD');
					if (!obj[key]) obj[key] = [item];
					else obj[key] = [...obj[key], item];
				});
				setData(obj);
			})
			.catch();
	}, [date]);

	return (
		<ul className={classNames(styles.grid, styles.days)}>
			{Object.keys(data).map((key: any, index: number) => (
				<li key={index} className={styles.day}>
					<span> {moment(key).format('D')}</span>
					{data[key] ? (
						<div className={styles.active}>
							{data[key].map((el: any, i: number) => (
								<div key={i}>
									<span className={styles.time}>
										{moment(el.start).format('hh:mm')}
									</span>
									<span className={styles.space_name}>{el.space.name}</span>
								</div>
							))}
						</div>
					) : null}

					{edit ? (
						<Button
							className={styles.add_btn}
							onclick={() => {
								setModalActive(key);
							}}
						/>
					) : null}
				</li>
			))}
		</ul>
	);
}

function initData(date: Moment) {
	const obj: any = {};
	for (let index = 0; index < 14; index++) {
		obj[moment(date).add(index, 'days').format('YYYY-MM-DD')] = null;
	}
	return obj;
}
