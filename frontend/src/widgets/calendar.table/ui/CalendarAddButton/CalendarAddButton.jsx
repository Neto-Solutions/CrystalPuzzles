import { ReactComponent as Plus } from '../../assets/plus.svg';
import styles from './CalendarAddButton.module.scss';

export const CalendarAddButton = ({ onclick, className }) => {
	return (
		<div className={className}>
			<Plus className={styles.svg} onClick={onclick} />
		</div>
	);
};
