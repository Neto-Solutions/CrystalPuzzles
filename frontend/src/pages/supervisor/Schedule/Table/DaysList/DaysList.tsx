import styles from './DaysList.module.scss';
import classNames from 'classnames';
import { Button } from '../Button/Button';
import moment from 'moment';

interface DaysListProps {
	setModalActive: (day: string) => void;
	edit: boolean;
	data: any;
}

export default function DaysList({
	setModalActive,
	edit,
	data
}: DaysListProps) {
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
