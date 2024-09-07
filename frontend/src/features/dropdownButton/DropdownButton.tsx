import classNames from 'classnames';
import { ReactComponent as SmallArrow } from '@shared/assets/svg/small_arrow.svg';
import styles from './DropdownButton.module.scss';
import { useState } from 'react';

interface DropdownButtonProps {
	className?: string;
	title: string;
	data?: any;
	setState: any;
}

// TODO: refactor this code
// setState must receive id or array of ids and it will be used to update state in parent component

//  possible solution: create new function which will be activated onChange and update state here and send it to parent
// or use form with scan checkbox on change and send it to parent

export default function DropdownButton({
	title,
	className,
	data = [],
	setState
}: DropdownButtonProps) {
	const [open, setOpen] = useState(false);
	const [selectedIds, setSelectedIds] = useState<string[]>([]);

	const handleCheckboxChange = (itemId: string) => {
		setSelectedIds((prev) => {
			if (prev.includes(itemId)) {
				const updatedSelectedIds = prev.filter((id) => id !== itemId);
				setState(updatedSelectedIds);
				return updatedSelectedIds;
			} else {
				const updatedSelectedIds = [...prev, itemId];
				setState(updatedSelectedIds);
				return updatedSelectedIds;
			}
		});
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
						<label htmlFor={item.id}>{item.name}</label>
						<input
							type="checkbox"
							className={styles.checkbox}
							id={item.id}
							checked={selectedIds.includes(item.id)}
							onChange={() => handleCheckboxChange(item.id)}
						/>
					</div>
				))}
			</form>
		</div>
	);
}
