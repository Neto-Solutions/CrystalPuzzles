export class Profile {
	_role = null;
	avatar = 0;
	constructor(data?: any) {
		if (!data) return;
		const { role, avatar, ...rest } = data;
		this._role = role;
		this.avatar = avatar;
		Object.assign(this, rest);
	}
	get role() {
		return this._role;
	}
}
