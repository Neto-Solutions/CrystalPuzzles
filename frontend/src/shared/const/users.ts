const users = [
	{
		id: '669fb39f4602ff2db81441f5',
		email: 'student@crystal.com',
		password: 'studentpass',
		firstname: 'Ольга',
		lastname: 'Ивановна',
		surname: 'Степанова',
		birthday: '2010-07-15',
		is_man: true,
		contact: '89037862447',
		avatar: 1,
		role: 'student'
	},
	{
		id: '669fb4464602ff2db81441f7',
		email: 'trainer@crystal.com',
		password: 'trainerpass',
		firstname: 'Валерия',
		lastname: 'Андреевна',
		surname: 'Качок',
		birthday: '1992-07-14',
		is_man: true,
		contact: '89037865247',
		avatar: 6,
		role: 'trainer'
	},
	{
		id: '669fb3e34602ff2db81441f6',
		email: 'supervisor@crystal.com',
		password: 'supervisorpass',
		firstname: 'Анастасия',
		lastname: 'Владимировна',
		surname: 'Долгих',
		birthday: '1990-07-16',
		is_man: true,
		contact: '89038652447',
		avatar: 4,
		role: 'supervisor'
	}
];

async function validateUser({ username, password }: any) {
	const user = await users.find(
		(user) => user.email === username && user.password === password
	);
	if (!user) {
		throw new Error();
	}

	return user;
}

export { validateUser, users };
