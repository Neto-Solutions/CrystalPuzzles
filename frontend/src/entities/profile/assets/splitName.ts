export default function splitName(name: string) {
	const [surname, firstname, lastname]: any = name.split(' ');
	if (!surname) return null;
	return { surname, firstname, lastname };
}
