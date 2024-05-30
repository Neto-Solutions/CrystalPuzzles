import styles from './CreateForm.module.scss';
import FormTitle from '../form.title/FormTitle';
import Search from '../input/Search';
import Students from '../students/Students'
import Button from '@shared/ui/button/Button';
export default function CreateForm() {

	
	return (
		<div className={styles.input_container}>
			<Search/>
			<FormTitle/>
			<Students/>
			<Students/>
			<Students/>
			<div className={styles.btn_cont}>
				<Button title="Создать" width="123px" height="49px" />
			</div>
			
		</div>

	);
}