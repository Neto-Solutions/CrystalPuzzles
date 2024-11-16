import joinName from 'entities/profile/assets/joinName';
import styles from './GroupItem.module.scss';

export default function GroupItem({ student }: any) {
	return <div className={styles.student}>{joinName(student.student)}</div>;
}
