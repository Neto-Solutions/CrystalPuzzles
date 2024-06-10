import styles from './List.module.scss';
import { CardLink } from '@shared/ui/card';
import { CheckList } from '@features/check.list';

export default function CheckListPage() {
	return (
		<>
			<CheckList />
			<CardLink
				title="Получи награду за выполнение уровня"
				className={styles.rewart_trio}
			/>
		</>
	);
}
