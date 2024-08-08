import styles from './Button.module.scss';
import { ReactComponent as Plus } from './assets/plus.svg';

export const Button = ({ onclick, className }) => {
	return (
		<div className={className}>
			<Plus className={styles.svg} onClick={onclick} />
		</div>
	);
};
