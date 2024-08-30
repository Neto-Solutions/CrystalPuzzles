import classNames from 'classnames';
import { ReactComponent as SmallArrow } from '@shared/assets/svg/small_arrow.svg';
import styles from './DropdownButton.module.scss';
import { useState } from 'react';

interface DropdownButtonProps {
	className?: string;
	title: string;
	data?: any;
	setState?: any;
}

export default function DropdownButton(props: DropdownButtonProps) {
	const { title, className, data = [], setState } = props;
	const [open, setOpen] = useState(false);
	return (
		<div
			className={classNames(styles.dropdown, className)}
			onClick={() => setOpen((prev) => !prev)}
		>
			<button className={styles.dropdown_button}>
				<span>{title}</span>
				<SmallArrow className={styles.small_arrow} />
			</button>

			<form
				className={classNames(styles.dropdown_list, open ? styles.active : '')}
			>
				{data.map((item: any, i: number) => (
					<div
						key={i}
						className={styles.list_item}
						onClick={(e) => {
							e.stopPropagation();
							setState(item.id);
						}}
					>
						<label htmlFor={item.id}>{item.name}</label>
						<input type="checkbox" className={styles.checkbox} id={item.id} />
					</div>
				))}
			</form>
		</div>
	);
}
