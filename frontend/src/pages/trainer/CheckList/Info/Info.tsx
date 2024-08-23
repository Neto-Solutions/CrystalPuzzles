import styles from './Info.module.scss';
import moment from 'moment';

export default function Info({ data, className }) {
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
				<span className={styles.place_value}>{data && data.place.name}</span>
			</div>
		</section>
	);
}
