interface user {
	surname: string;
	firstname: string;
	lastname: string;
}

export default function joinName(user: user) {
	const { surname, firstname, lastname } = user;
	return `${surname ? surname : ''} ${firstname ? firstname : ''} ${lastname ? lastname : ''}`.trim();
}
