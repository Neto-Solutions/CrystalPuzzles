import { useEffect, useState } from 'react';
import { DropdownButton } from '@shared/ui';
import { Place } from '@shared/api';

interface PlacesDropdownProps {
	className?: string;
	state?: any;
	setState: any;
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
		Place.get().then((data) => setData(data));
	}, []);

	return (
		<DropdownButton
			className={className}
			title="Выберите группу"
			state={state}
			setState={setState}
			data={data}
			single={single}
		/>
	);
}
