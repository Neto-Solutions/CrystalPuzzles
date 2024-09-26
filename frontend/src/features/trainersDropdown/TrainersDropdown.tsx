import { DropDownButton } from '@features';
import { User } from '@shared/api';
import joinName from 'entities/profile/assets/joinName';
import { useEffect, useState } from 'react';

interface TrainersDropdownProps {
	className?: string;
	state?: any;
	setState: any;
	single?: boolean;
}

export default function TrainersDropdown({
	state,
	setState,
	className,
	single
}: TrainersDropdownProps) {
	const [data, setData] = useState<any>([]);

	useEffect(() => {
		getTrainers();
	}, []);

	async function getTrainers() {
		const [data, err] = await User.getTrainers();
		if (err) return;
		setData(data.map((item: any) => ({ ...item, name: joinName(item) })));
	}

	return (
		<DropDownButton
			className={className}
			title="Выберите тренера"
			state={state}
			setState={setState}
			data={data}
			single={single}
		/>
	);
}
