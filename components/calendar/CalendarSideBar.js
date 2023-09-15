import axios from "axios"
import { GrAddCircle } from 'react-icons/gr';
import { IconContext } from "react-icons";

import { useEffect, useState } from "react"
import { TimePicker } from 'antd'
import { Lato } from 'next/font/google'

const latoRegular = Lato({
    weight: '400',
    subsets: ['latin'],
})
const lato = Lato({
    weight: '700',
    subsets: ['latin'],
})


export default function CalendarSideBarComponents({ setCalendarDataForEdit, setEditCalendarTasks, setCalendarSidebar, CalendarSidebar, EditCalendarTasks, loading, setloading, CalendarSideBarData, CreateCalendarTasks, setCreateCalendarTasks, }) {

    return (
        <div className={`CalendarSideBar ${CalendarSidebar ? 'active' : 'desactive'} `}>
            {
                CalendarSidebar
                    ? <>
                        <div className="TitleSideBar">
                            <div className={`numeber ${lato.className}`}>
                                {CalendarSideBarData.number}
                            </div>
                            <div className="text">
                                <>&nbsp;</>
                                {`${CalendarSideBarData.diaSemana}`}

                            </div>
                        </div>
                        {
                            CalendarSideBarData.requestTask
                                ? <div className="continerInfoSideBar">
                                    {CalendarSideBarData.Tasks.map((item) => {
                                        let AllDay = false
                                        const time = new Date(item.intialHour).toLocaleTimeString('es-AR').slice(0, 5)
                                        if (item.intialHour.split('T')[1] === '00:00:00.000Z' && item.finishHour.split('T')[1] === '23:59:59.999Z') {
                                            AllDay = true
                                        }

                                        return (
                                            AllDay ?
                                                (
                                                    <div className="sidebarCalendarTasks" onClick={() => { setCalendarDataForEdit(item); setEditCalendarTasks(true); setCalendarSidebar(false) }}  >
                                                        <div className="time"> Todo el dia</div>
                                                        <div className="separador" style={{ backgroundColor: item.colorHex }}></div>
                                                        <div className="titleCalendarTask">{item.title}</div>
                                                    </div>
                                                )
                                                : (
                                                    <div className="sidebarCalendarTasks" onClick={() => { setCalendarDataForEdit(item); setEditCalendarTasks(true); setCalendarSidebar(false) }} >
                                                        <div className="time" >{time}</div>
                                                        <div className="separador" style={{ backgroundColor: item.colorHex }}></div>
                                                        <div className="titleCalendarTask">{item.title}</div>
                                                    </div>
                                                )

                                        )



                                    })}


                                </div>
                                : <div className="continerWithoutInfoSideBar">Todavia no tienes tareas</div>
                        }
                        <div onClick={() => { setCalendarSidebar(false); setCreateCalendarTasks(true) }} className="BtnBack">
                            <GrAddCircle color="#fff" size={18} />

                            <>&nbsp;</>
                            <div>
                                Crear un recordatorio
                            </div>
                        </div>

                    </>
                    : <></>
            }
        </div>
    )
}