import classNames from 'classnames';
import { ReactComponent as SmallArrow } from '@shared/assets/svg/small_arrow.svg';
import styles from './DropdownButton.module.scss';
import { useState } from 'react';

interface DropdownButtonProps {
	className?: string;
	title: string;
	data?: any;
	state?: any;
	setState: any;
	single?: boolean;
}

export default function DropdownButton({
	title,
	className,
	data = [],
	state,
	setState,
	single = false
}: DropdownButtonProps) {
	const [open, setOpen] = useState(false);
	// const [selectedIds, setSelectedIds] = useState<string[]>([]);

	const handleCheckboxChange = (itemId: string) => {
		if (single) {
			setState(itemId);
		} else if (state.includes(itemId)) {
			const updatedSelectedIds = state.filter((id: any) => id !== itemId);
			setState(updatedSelectedIds);
		} else {
			const updatedSelectedIds = [...state, itemId];
			setState(updatedSelectedIds);
		}
	};

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
				onClick={(e) => e.stopPropagation()}
			>
				{data.map((item: any) => (
					<div key={item.id} className={styles.list_item}>
						{/* // data должна содержать name *нужно размапить */}
						<label htmlFor={item.id}>{item.name}</label>
						<input
							type="checkbox"
							className={styles.checkbox}
							id={item.id}
							checked={single ? state === item.id : state?.includes(item.id)}
							onChange={() => handleCheckboxChange(item.id)}
						/>
					</div>
				))}
			</form>
		</div>
	);
}
