import styles from './Groups.list.module.scss';

export default function GroupsList({ data }) {
	return (
		<div className={styles.container}>
			{data?.map((item) => (
				<div className={styles.group} key={item._id}>
					{item.id} группа {item.name}
				</div>
			))}
		</div>
	);
}
