import { DropDownButton } from '@features';
import { User } from '@shared/api';
import joinName from 'entities/profile/assets/joinName';
import { useEffect, useState } from 'react';

interface StudentsDropdownProps {
	className?: string;
	state: any;
	setState: any;
	single?: boolean;
}

export default function StudentsDropdown({
	state,
	setState,
	className,
	single = false
}: StudentsDropdownProps) {
	const [data, setData] = useState<any>([]);

	useEffect(() => {
		getStudents();
	}, []);

	async function getStudents() {
		const [data, err] = await User.getStudents();
		if (err) return;
		setData(data.map((item: any) => ({ ...item, name: joinName(item) })));
	}

	return (
		<DropDownButton
			className={className}
			title="Выберите учеников"
			state={state}
			setState={setState}
			data={data}
			single={single}
		/>
	);
}
