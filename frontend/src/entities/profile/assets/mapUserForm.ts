import { splitName } from './';

export default function mapUserForm(e: any) {
	const data: any = {};

	for (let i = 0; i < e.target.length; i++) {
		const key = e.target[i].getAttribute('data-key');
		if (key === 'name') {
			const name = splitName(e.target[i].value);
			Object.assign(data, name);
			continue;
		}
		if (key && e.target[i].value) {
			data[key] = e.target[i].value;
		}
	}
	return data;
}
