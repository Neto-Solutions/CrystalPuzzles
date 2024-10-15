import styles from './Input.module.scss';

interface InputProps {
	label: string;
	dataKey: string;
	type: string;
	required: boolean;
	pattern?: string;
	placeholder?: string;
	min?: string;
	max?: string;
	children?: any;
}

export default function Input({
	label,
	dataKey,
	type,
	required,
	pattern,
	placeholder,
	min,
	max,
	children
}: InputProps) {
	return (
		<div className={styles.container}>
			{label && <label className={styles.label}>{label}</label>}
			<input
				className={styles.input}
				data-key={dataKey}
				type={type}
				required={required}
				pattern={pattern}
				placeholder={placeholder}
				min={min}
				max={max}
			/>
			{children}
		</div>
	);
}
