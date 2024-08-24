import styles from './ScheduleItem.module.scss';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';

export default function ScheduleItem({ data, className }: any) {
	return (
		<Link to={`/schedule/${data._id}`} className={styles.link}>
			<div className={classNames(styles.row, className)}>
				<div className={styles.col}>
					{data.start ? moment(data.start).format('HH:mm') : null}
				</div>
				<div className={styles.col}>
					<span className={styles.col_content}>
						{data.place ? `Место - ${data.place.name}` : null}
					</span>
				</div>
			</div>
		</Link>
	);
}
