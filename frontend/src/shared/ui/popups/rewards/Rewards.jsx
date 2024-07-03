import styles from './Rewards.module.scss';
export default function RewardsPopup({ onHide }) {
	return (
		<div className={styles.container} onClick={onHide}>
			<div className={styles.popup} onClick={(e) => e.stopPropagation()}>
				<header>Коллекция наград</header>
			</div>
		</div>
	);
}
