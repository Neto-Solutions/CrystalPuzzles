import styles from './DaysList.module.scss';
import classNames from 'classnames';
import { Button } from '../Button/Button';
import moment from 'moment';

export default function DaysList({ setModalActive, edit, data }: any) {
	return (
		<ul className={classNames(styles.grid, styles.days)}>
			{Object.keys(data)?.map((key: any, index: number) => (
				<li key={index} className={styles.day}>
					<span> {moment(key).format('D')}</span>
					{data[key] ? (
						<div className={styles.active}>
							{[...Array(4)].map((_, i) => (
								<div key={i}>
									<span className={styles.time}>
										{moment(data[key].start).format('hh:mm')}
									</span>
									<span className={styles.space_name}>
										{data[key].space.name}
									</span>
								</div>
							))}
						</div>
					) : null}

					{edit ? (
						<Button
							className={styles.add_btn}
							onclick={() => {
								setModalActive(moment(key).format('D'));
							}}
						/>
					) : null}
				</li>
			))}
		</ul>
	);
}
