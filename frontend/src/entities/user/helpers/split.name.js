export default function splitName(name) {
	const [surname, firstname, lastname] = name.split(' ');
	return { surname, firstname, lastname };
}
