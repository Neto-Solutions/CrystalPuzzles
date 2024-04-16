import './Progress.graph.page.module.scss';
import PageContainer from '../../components/page.container/Page.container';
import UserCard from '../../components/user.card/User.card';

export default function ProgressGraphPage() {
  const tempArray = Array.from(
    { length: 6 },
    () => 'Дмитриева Анастасия Алексеевна'
  );
  return (
    <>
      <PageContainer.Header title="График прогресса тренеров" />
      <PageContainer.Body>
        {tempArray.map((item, index) => {
          return <UserCard key={index} name={item} />;
        })}
      </PageContainer.Body>
    </>
  );
}
