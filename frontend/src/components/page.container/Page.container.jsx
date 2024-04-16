import './Page.container.scss';
const PageContainer = {
	Header: ({ title }) => <Header title={title} />,
	Body: ({ children }) => <Body>{children}</Body>
};
function Header({ title }) {
	return (
		<header className="header_page_container">
			<h1 className="header_page">{title}</h1>
		</header>
	);
}
function Body({ children }) {
	return <div className="body_page_container">{children}</div>;
}

export default PageContainer;
export { Header, Body };
