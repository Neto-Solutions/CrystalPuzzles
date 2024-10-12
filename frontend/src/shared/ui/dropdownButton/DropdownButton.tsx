import { useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as SmallArrow } from '@shared/assets/svg/small_arrow.svg';
// import { useClickOutside } from '@shared/hooks/useClickOutside';
import styles from './DropdownButton.module.scss';

interface DropdownButtonProps {
	className?: string;
	title: string;
	data?: any[];
	state?: any;
	setState: any;
	single?: boolean;
}

export default function DropdownButton({
	title,
	className,
	data,
	state,
	setState,
	single = false
}: DropdownButtonProps) {
	const [open, setOpen] = useState(false);
	// const [selectedIds, setSelectedIds] = useState<string[]>([]);
	// const dropdownRef = useRef<HTMLDivElement>(null);

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

	// useClickOutside({
	// 	ref: dropdownRef,
	// 	handleClickOutside: () => setOpen(false)
	// });

	return (
		<div
			className={classNames(styles.dropdown, className)}
			onClick={() => setOpen((prev) => !prev)}
			// ref={dropdownRef}
		>
			<button className={styles.dropdown_button}>
				<span>{title}</span>
				<SmallArrow
					className={classNames(
						styles.small_arrow,
						open ? styles.arrow_open : ''
					)}
					height={'16px'}
					width={'20px'}
				/>
			</button>

			<form
				className={classNames(styles.dropdown_list, open ? styles.active : '')}
				onClick={(e) => e.stopPropagation()}
			>
				{data?.length
					? data.map((item: any) => (
							<div key={item.id} className={styles.list_item}>
								{/* // data должна содержать name *нужно размапить */}
								<label htmlFor={item.id}>{item.name}</label>
								<input
									type="checkbox"
									className={styles.checkbox}
									id={item.id}
									checked={
										single ? state === item.id : state?.includes(item.id)
									}
									onChange={() => handleCheckboxChange(item.id)}
								/>
							</div>
						))
					: null}
			</form>
		</div>
	);
}
