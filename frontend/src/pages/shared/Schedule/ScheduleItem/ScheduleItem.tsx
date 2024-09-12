import styles from './ScheduleItem.module.scss';
import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';

export default function ScheduleItem({ data, className }: any) {
	return (
		<Link to={`/exercise/${data.id}`} className={styles.link}>
			<div className={classNames(styles.row, className)}>
				<div className={styles.col}>
					{data.start ? moment(data.start).format('HH:mm') : null}
				</div>
				<div className={styles.col}>
					<span className={styles.col_content}>
						{data.space ? `Место - ${data.space.name}` : null}
					</span>
				</div>
			</div>
		</Link>
	);
}
