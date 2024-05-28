import styles from './Search.module.scss';


export default function Search() {

	
	return (
		<input 
			className={styles.input_text}
			type="text"
			placeholder="Дмитриева Мария"
		/>


	);
}