import { DropDownButton } from '@features';
import { User } from '@shared/api';
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
		User.getTrainers().then((data) => setData(data));
	}, []);

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
