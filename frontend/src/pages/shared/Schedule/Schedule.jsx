import styles from './Schedule.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Page, Wrapper } from '@shared/ui';
import { CalendarBlock } from '@features/calendar';
import moment from 'moment';

export default function SchedulePage({ link = false }) {
	// eslint-disable-next-line no-unused-vars
	const [data, setData] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [date, setDate] = useState();

	return (
		<Page title="Расписание">
			<div className={styles.table}>
				{data.length
					? data.map((item, index) => (
							<Link
								key={index}
								to={!link ? null : `/schedule/${item._id}`}
								className={styles.link}
							>
								<div className={styles.row}>
									<div className={styles.col}>
										{moment(item.start).format('HH:mm')}
									</div>
									<div className={styles.col}>
										<span className={styles.col_content}>
											{item.place.name && `Место - ${item.place.name}`}
										</span>
									</div>
								</div>
							</Link>
						))
					: null}
			</div>
			<Wrapper>
				<CalendarBlock setNewDate={setDate} />
			</Wrapper>
		</Page>
	);
}
