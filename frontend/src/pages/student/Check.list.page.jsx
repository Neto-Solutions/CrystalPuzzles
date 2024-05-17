import styles from './Check.list.page.module.scss';
import Page from '@shared/ui/page/Page';
import Card from '@features/card/card.link/Card.link';
import CheckList from '@widgets/check.list/Check.list';

export default function CheckListPage() {
	return (
		<Page title="Чек-листы">
			<CheckList />
			<Card
				title="Получи награду за выполнение уровня"
				className={styles.rewart_trio}
			/>
		</Page>
	);
}
