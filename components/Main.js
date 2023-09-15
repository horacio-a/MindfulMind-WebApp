import Routine from "./MainPages/Routine"
import Calendar from "./MainPages/Calendar"
import Text from "./MainPages/Text"

export default function Main({ sidebar, routineData, setroutineData, calendarData, setcalendarData, TextData, setTextData, loading, setloading, page, refreshData }) {

    return (
        <div className={`MainContent ${sidebar ? 'Active' : 'Desactive'}`}>

            {
                page === 'Routine'
                    ? <Routine routineData={routineData} setroutineData={setroutineData} loading={loading} setloading={setloading} />
                    : <></>
            }
            {
                page === 'Calendar'
                    ? <Calendar calendarData={calendarData} setcalendarData={setcalendarData} loading={loading} setloading={setloading} refreshData={refreshData} />
                    : <></>
            }
            {
                page === 'Text'
                    ? <Text TextData={TextData} setTextData={setTextData} loading={loading} setloading={setloading} />
                    : <></>
            }
        </div>
    )
}