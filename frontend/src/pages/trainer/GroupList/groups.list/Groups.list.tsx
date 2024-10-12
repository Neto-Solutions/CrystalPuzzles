import classNames from 'classnames';
import styles from './Groups.list.module.scss';
import { useEffect, useState } from 'react';
import { Group } from '@shared/api';
import joinName from 'entities/profile/assets/joinName';

interface GroupsListProps {
	className?: string;
}

export default function GroupsList({ className }: GroupsListProps) {
	const [data, setData] = useState([]);

	useEffect(() => {
		Group.get().then(([data, err]) => {
			if (err) return;
			setData(data.sort((a: any, b: any) => a.id - b.id));
		});
	}, []);

	return (
		<div className={classNames(styles.container, className)}>
			{data?.map((item: any) => (
				<>
					<div className={styles.group} key={item.id}>
						{item.id} группа {item.name}
					</div>
					<div className={styles.students}>
						{item?.students?.map((student: any) => (
							<div className={styles.student} key={student.id}>
								{joinName(student.student)}
							</div>
						))}
					</div>
				</>
			))}
		</div>
	);
}
