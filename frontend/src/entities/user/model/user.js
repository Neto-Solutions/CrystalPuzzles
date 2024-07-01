export class User {
	_role = null;
	constructor(data) {
		if (!data) return;
		const { role, avatar, ...rest } = data;
		this._role = role;
		this.avatar = avatar ? avatar : 0;
		Object.assign(this, rest);
	}
	get role() {
		return this._role;
	}
}
