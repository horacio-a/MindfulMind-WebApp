
import { Lato } from 'next/font/google'

import CalendarNumber from './CalendarNumber'

const latoRegular = Lato({
    weight: '400',
    subsets: ['latin'],
})
const lato = Lato({
    weight: '700',
    subsets: ['latin'],
})


export default function CalendarComponent({ ActiveCard, calendarData, setcalendarData, CalendarSidebar, setCalendarSidebar }) {

    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
            <div className={`titleCalendar ${lato.className}`}>{calendarData.data.month} {calendarData.data.year}</div>
            <div className='weekDays'>
                <div className='daysOfWeek'>Domingo</div>
                <div className='daysOfWeek'>Lunes</div>
                <div className='daysOfWeek'>Martes</div>
                <div className='daysOfWeek'>Miercoles</div>
                <div className='daysOfWeek'>Jueves</div>
                <div className='daysOfWeek'>Viernes</div>
                <div className='daysOfWeek'>Sabado</div>
            </div>
            <div className='ConteinerNumeber'>
                <div className='RowCalendar'>
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[0].id}
                        data={calendarData.days[0]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[1].id}
                        data={calendarData.days[1]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[2].id}
                        data={calendarData.days[2]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[3].id}
                        data={calendarData.days[3]}
                    />

                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[4].id}
                        data={calendarData.days[4]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[5].id}
                        data={calendarData.days[5]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[6].id}
                        data={calendarData.days[6]}
                    />


                </div>
                <div className='RowCalendar'>
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[7].id}
                        data={calendarData.days[7]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[8].id}
                        data={calendarData.days[8]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[9].id}
                        data={calendarData.days[9]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[10].id}
                        data={calendarData.days[10]}
                    />

                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[11].id}
                        data={calendarData.days[11]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[12].id}
                        data={calendarData.days[12]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[13].id}
                        data={calendarData.days[13]}
                    />

                </div>
                <div className='RowCalendar'>
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[14].id}
                        data={calendarData.days[14]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[15].id}
                        data={calendarData.days[15]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[16].id}
                        data={calendarData.days[16]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[17].id}
                        data={calendarData.days[17]}
                    />

                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[18].id}
                        data={calendarData.days[18]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[19].id}
                        data={calendarData.days[19]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[20].id}
                        data={calendarData.days[20]}
                    />

                </div>
                <div className='RowCalendar'>
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[21].id}
                        data={calendarData.days[21]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[22].id}
                        data={calendarData.days[22]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[23].id}
                        data={calendarData.days[23]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[24].id}
                        data={calendarData.days[24]}
                    />

                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[25].id}
                        data={calendarData.days[25]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[26].id}
                        data={calendarData.days[26]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[27].id}
                        data={calendarData.days[27]}
                    />
                </div>
                <div className='RowCalendar'>
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[28].id}
                        data={calendarData.days[28]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[29].id}
                        data={calendarData.days[29]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[30].id}
                        data={calendarData.days[30]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[31].id}
                        data={calendarData.days[31]}
                    />

                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[32].id}
                        data={calendarData.days[32]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[33].id}
                        data={calendarData.days[33]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[34].id}
                        data={calendarData.days[34]}
                    />
                </div>
                <div className='RowCalendar'>
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[35].id}
                        data={calendarData.days[35]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[36].id}
                        data={calendarData.days[36]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[37].id}
                        data={calendarData.days[37]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[38].id}
                        data={calendarData.days[38]}
                    />

                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[39].id}
                        data={calendarData.days[39]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[40].id}
                        data={calendarData.days[40]}
                    />
                    <CalendarNumber
                        ActiveCard={ActiveCard}
                        key={calendarData.days[41].id}
                        data={calendarData.days[41]}
                    />
                </div>
            </div>

            <div onClick={() => { }} style={{ width: '50px', height: '50px', backgroundColor: 'red' }}></div>


        </div>
    )
}