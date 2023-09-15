
import { Lato } from 'next/font/google'



const latoRegular = Lato({
    weight: '400',
    subsets: ['latin'],
})
const lato = Lato({
    weight: '700',
    subsets: ['latin'],
})


export default function CalendarNumber({ data, ActiveCard }) {

    return (
        <div onClick={() => { ActiveCard(data) }} className={`CalendarNumberConteiner ${data.Today ? 'today' : ''} ${data.ThisMount ? '' : 'lowOpacity'}`}>
            {data.number}
            {
                data.requestTask
                    ? <div className={`dotTasks  ${data.Today ? 'today' : ''} ${data.ThisMount ? '' : 'lowOpacity'}`}></div>
                    : <></>
            }
        </div>
    )
}