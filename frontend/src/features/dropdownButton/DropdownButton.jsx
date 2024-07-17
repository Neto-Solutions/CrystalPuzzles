import classNames from 'classnames';
import { ReactComponent as SmallArrow } from '@shared/assets/svg/small_arrow.svg';
import styles from './DropdownButton.module.scss';

export const DropdownButton = ({
	title,
	onClick,
	className,
	open,
	data,
	width,
	setState
}) => {
	return (
		<div
			className={classNames(styles.dropdown, className)}
			onClick={onClick}
			width={width}
		>
			<button className={styles.dropdown_button}>
				<span>{title}</span>
				<SmallArrow className={styles.small_arrow} />
			</button>

			<form
				className={classNames(styles.dropdown_list, open ? styles.active : '')}
			>
				{data.map((item) => (
					<div
						className={styles.list_item}
						key={item.id}
						onClick={() => setState(item.id)}
					>
						<label htmlFor={item.name}>{item.name}</label>
						<input type="radio" className={styles.checkbox} id={item.name} />
					</div>
				))}
			</form>
		</div>
	);
};

{
	/* <form>

    <legend>Choose your favorite monster</legend>

    <input type="radio" id="kraken" name="monster" value="K" />
    <label for="kraken">Kraken</label><br />

    <input type="radio" id="sasquatch" name="monster" value="S" />
    <label for="sasquatch">Sasquatch</label><br />

    <input type="radio" id="mothman" name="monster" value="M" />
    <label for="mothman">Mothman</label>
  </fieldset>
</form> */
}
