import styles from './Check.list.page.module.scss';
import Page from '@components/page/Page';
import Card from '@components/card/Card.link';
import bunny from '@assets/svg/bunny.svg';
import hedgehog from '@assets/svg/hedgehog.svg';
import raccoon from '@assets/svg/raccoon.svg';
import CheckList from '../../components/check.list.block/Check.list';

export default function CheckListPage() {
	return (
		<Page title="Чек-листы">
			<CheckList />
			<Card title="Получи награду за выполнение уровня">
				<div className={styles.container}>
					<img className={styles.bunny} src={bunny} alt="" />
					<img className={styles.hedgehog} src={hedgehog} alt="" />
					<img className={styles.raccoon} src={raccoon} alt="" />
				</div>
			</Card>
		</Page>
	);
}
