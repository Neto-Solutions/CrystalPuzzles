function fetchImg(baseUrl, args) {
	if (!baseUrl) throw new Error('url is required');
	if (!args) {
		return fetch(baseUrl)
			.then((res) => res.blob())
			.then((blob) => URL.createObjectURL(blob));
	}
	if (!Array.isArray(args)) throw new Error('second argument must be an array');
	return Promise.all(
		args.map((arg) =>
			fetch(baseUrl + arg)
				.then((res) => res.blob())
				.then((blob) => URL.createObjectURL(blob))
		)
	);
}
