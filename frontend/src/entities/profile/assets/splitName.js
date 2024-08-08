export default function splitName(name) {
	const [surname, firstname, lastname] = name.split(' ');
	if (!surname) return null;
	return { surname, firstname, lastname };
}
