import classNames from 'classnames';
import styles from './Groups.list.module.scss';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Group } from '@shared/api';
import GroupItem from './groupItem/GroupItem';

interface GroupsListProps {
	className?: string;
}

export default function GroupsList({ className }: GroupsListProps) {
	const [data, setData] = useState([]);
	const [isOpen, setIsOpen] = useState(null);

	useEffect(() => {
		Group.get().then(([data, err]) => {
			if (err) return;
			setData(data.sort((a: any, b: any) => a.id - b.id));
		});
	}, []);

	function handleClick(id: any) {
		setIsOpen(isOpen === id ? null : id);
	}

	return (
		<div className={classNames(styles.container, className)}>
			{data?.map((item: any) => (
				<div
					className={styles.group_container}
					key={uuid()}
					onClick={(e) => {
						e.stopPropagation();
						handleClick(item.id);
					}}
					style={isOpen === item.id ? { height: 'auto' } : {}}
				>
					<div className={styles.group}>
						{item.id} группа {item.name}
					</div>
					<div className={styles.students}>
						{item?.students?.map((student: any) => (
							<>
								<GroupItem student={student} key={uuid()} />
							</>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
