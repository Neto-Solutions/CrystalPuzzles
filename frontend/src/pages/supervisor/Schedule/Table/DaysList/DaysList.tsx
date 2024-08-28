import styles from './DaysList.module.scss';
import classNames from 'classnames';
import { Button } from '../Button/Button';
import moment from 'moment';

export default function DaysList({ setModalActive, edit, data }: any) {
	return (
		<ul className={classNames(styles.grid, styles.days)}>
			{Object.keys(data)?.map((key: any, index: number) => (
				<li key={index} className={styles.day}>
					{moment(key).format('D')}
					{data[key].space.name} {/* TODO: fix data */}
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
