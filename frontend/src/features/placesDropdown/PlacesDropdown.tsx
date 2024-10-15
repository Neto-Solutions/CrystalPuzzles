import { useEffect, useState } from 'react';
import { DropdownButton } from '@shared/ui';
import { Place } from '@shared/api';

interface PlacesDropdownProps {
	className?: string;
	state?: any;
	setState?: any;
	single?: boolean;
}
export default function PlacesDropdown({
	state,
	setState,
	className,
	single
}: PlacesDropdownProps) {
	const [data, setData] = useState([]);

	useEffect(() => {
		getPlace();
	}, []);

	async function getPlace() {
		const [data, err] = await Place.get();
		if (err) return;
		setData(data);
	}
	return (
		<DropdownButton
			className={className}
			title="Выберите площадку"
			state={state}
			setState={setState}
			data={data}
			single={single}
		/>
	);
}
