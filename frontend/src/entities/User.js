class User {
	name = null;
	avatar = null;
	_role = null;
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

export default User;
