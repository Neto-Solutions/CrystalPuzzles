import { useEffect, useState } from 'react';
import { DropdownButton } from '@shared/ui';
import { Place } from '@shared/api';
import { selectPlaces, setPlaces } from '@app/providers/store/app';
import { useDispatch, useSelector } from 'react-redux';

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

	const places = useSelector(selectPlaces);
	const dispatch = useDispatch();

	useEffect(() => {
		getPlace();
	}, [places]);

	async function getPlace() {
		if (places) {
			setData(places);
		} else {
			const [data, err] = await Place.get();
			if (err) return;
			dispatch(setPlaces(data));
		}
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
