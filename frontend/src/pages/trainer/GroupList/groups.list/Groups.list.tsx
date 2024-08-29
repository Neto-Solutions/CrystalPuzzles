import classNames from 'classnames';
import styles from './Groups.list.module.scss';

interface GroupsListProps {
	data: any;
	className?: string;
}

export default function GroupsList({ data, className }: GroupsListProps) {
	return (
		<div className={classNames(styles.container, className)}>
			{data?.map((item: any) => (
				<div className={styles.group} key={item._id}>
					{item.id} группа {item.name}
				</div>
			))}
		</div>
	);
}
