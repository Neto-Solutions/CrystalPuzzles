import styles from './TrainCreateGroup.module.scss';
import Button from '@shared/ui/button/Button';
import GroupName from './title/GroupName';
import CreateForm from './create.form/CreateForm';
export default function TrainCreateGroup() {
	return (
		<>
			<GroupName />
			<Button title="Ученики" width="347px" height="57px" />
			<CreateForm />
		</>
	);
}
