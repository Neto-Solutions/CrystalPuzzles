import classNames from 'classnames';
import { ReactComponent as SmallArrow } from '@shared/assets/svg/small_arrow.svg';
import styles from './DropdownButton.module.scss';

export default function DropdownButton(props: any) {
	const { title, onClick, className, open, data = [], width, setState } = props;
	return (
		<div className={classNames(styles.dropdown, className)} onClick={onClick}>
			<button className={styles.dropdown_button}>
				<span>{title}</span>
				<SmallArrow className={styles.small_arrow} />
			</button>

			<form
				className={classNames(styles.dropdown_list, open ? styles.active : '')}
			>
				{data.map((item: any) => (
					<div
						className={styles.list_item}
						key={item.id}
						onClick={(e) => {
							e.stopPropagation();
							setState(item.id);
						}}
					>
						<label htmlFor={item.name}>{item.name}</label>
						<input type="checkbox" className={styles.checkbox} id={item.name} />
					</div>
				))}
			</form>
		</div>
	);
}
