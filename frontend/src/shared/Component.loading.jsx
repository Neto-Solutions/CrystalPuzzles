export default function ComponentLoading({ children, isLoading }) {
	return (
		<>
			{isLoading ? (
				<div className="d-flex justify-content-center">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			) : (
				children
			)}
		</>
	);
}
