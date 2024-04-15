import "./Page.container.scss";

const PageContainer = {
  Header: ({title}) => <Header title={title} />,
  Body: ({children}) => <Body>{children}</Body>,
};
function Header({title}) {
  return (
    <header className='container'>
      <h1 className='header'>{title}</h1>
    </header>
  );
}

function Body({children, className}) {
  return <div className={`${'body-container'} ${className}}`}>{children}</div>;
}

export default PageContainer;
export {Header, Body};
