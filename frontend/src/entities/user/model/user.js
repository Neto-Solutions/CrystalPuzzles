export class User {
	_role = 'methodist';
	constructor(data) {
		if (!data) return;
		const { role, ...rest } = data;
		this._role = role;
		Object.assign(this, rest);
	}
	get role() {
		return this._role;
	}
}
