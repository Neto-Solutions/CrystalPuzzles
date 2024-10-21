import { selectTrainers, setTrainers } from '@app/providers/store/app';
import { DropDownButton } from '@features';
import { User } from '@shared/api';
import joinName from 'entities/profile/assets/joinName';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

	const trainers = useSelector(selectTrainers);
	const dispatch = useDispatch();

	useEffect(() => {
		getTrainers();
	}, [trainers]);

	async function getTrainers() {
		if (trainers) {
			setData(trainers.map((item: any) => ({ ...item, name: joinName(item) })));
			setState(trainers[0].id);
		} else {
			const [data, err] = await User.getTrainers();
			if (err) return;
			dispatch(setTrainers(data));
			setState(data[0].id);
		}
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
