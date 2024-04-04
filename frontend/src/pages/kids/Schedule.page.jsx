import "./Schedule.page.css"
import PageContainer from "../../components/page.container/Page.container"
export default function SchedulePage() {
    const tempArray = Array.from({ length: 7 }, () => ({ time: "10:15", name: "Test" }))
    return (
        <>
            <PageContainer.Header title="Расписание" />
            <PageContainer.Body>
                <table className="schedule_table">
                    {tempArray.map((item, index) => (
                        <tr key={index} className="schedule_table_row">
                            <td className="schedule_table_row_item_time">{item.time}</td>
                            <td className="schedule_table_row_item">{item.name}</td>
                        </tr>
                    ))}
                </table>
                <div className="schedule_calendar"></div>
            </PageContainer.Body>
        </>
    )
}
