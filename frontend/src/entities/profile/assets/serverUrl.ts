export default function serverUrl() {
	return (process.env.REACT_APP_SERVER_API || window.API_URL)?.replace(
		new RegExp(/\/api\/.*$/, 'g'),
		''
	);
}
