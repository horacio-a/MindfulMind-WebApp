import axios from "axios"
import { useEffect, useState } from "react"
import { GrAddCircle } from 'react-icons/gr';
import { RxCheck, RxCross2, RxCheckbox, RxBox, RxTrash } from "react-icons/rx";
import ReactDragList from 'react-drag-list'
import { Lato } from 'next/font/google'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Skeleton from '@mui/material/Skeleton';
import CalendarComponent from "../calendar/CalendarComponent";
import CalendarEdit from "../calendar/CalendarEdit";
import CalendarSideBarComponents from "../calendar/CalendarSideBar";
import CalendarCreate from "../calendar/CalendarCreate";
import CalendarSideBarConfigComponet from "../calendar/CalendarSideBarConfig";

const latoRegular = Lato({
    weight: '400',
    subsets: ['latin'],
})
const lato = Lato({
    weight: '700',
    subsets: ['latin'],
})


export default function Calendar({ sidebar, calendarData, setcalendarData, loading, setloading, refreshData }) {
    const [CalendarSidebar, setCalendarSidebar] = useState(false)
    const [EditCalendarTasks, setEditCalendarTasks] = useState(false)
    const [CreateCalendarTasks, setCreateCalendarTasks] = useState(false)
    const [CalendarSideBarConfig, setCalendarSideBarConfig] = useState(false)

    const [ConfigSideBarData, setConfigSideBarData] = useState([])

    const [CalendarSideBarData, setCalendarSideBarData] = useState()

    const [CalendarDataForEdit, setCalendarDataForEdit] = useState()



    const ActiveCard = (data) => {
        if (data !== CalendarSideBarData) {
            setCalendarSidebar(false)
            if (CalendarSidebar) {
                setTimeout(() => {
                    setCalendarSideBarData(data)
                    setCalendarSidebar(true)
                }, 350)
            } else {
                setCalendarSideBarData(data)
                setCalendarSidebar(true)
            }

        } else {
            CalendarSidebar ? setCalendarSidebar(false) : setCalendarSidebar(true)
        }

    }

    const [NotificacionTime, setNotificacionTime] = useState('Al momento')
    const [RepeatTime, setRepeatTime] = useState('Nunca')


    const ActiveConfig = (data) => {
        if (data.Title !== ConfigSideBarData.Title) {
            setCalendarSideBarConfig(false)
            if (CalendarSideBarConfig) {
                setTimeout(() => {
                    setCalendarSideBarConfig(true)
                    setConfigSideBarData(data)
                }, 350)
            } else {
                setCalendarSideBarConfig(true)
                setConfigSideBarData(data)
            }
        } else {
            CalendarSideBarConfig ? setCalendarSideBarConfig(false) : setCalendarSideBarConfig(true)
        }




    }

    return (
        <div className={`CalendarConteiner ${sidebar ? 'Active' : 'Desactive'}`}>
            {
                !loading
                    ?
                    <div className={`contentCalendar`}>
                        <div className={`Calendar  ${CalendarSidebar ? 'active' : 'desactive'} `}>
                            <CalendarComponent ActiveCard={ActiveCard} calendarData={calendarData} setcalendarData={setcalendarData}
                                CalendarSidebar={CalendarSidebar} setCalendarSidebar={setCalendarSidebar} />

                            <CalendarEdit CalendarSideBarConfig={CalendarSideBarConfig} setCalendarSideBarConfig={setCalendarSideBarConfig}
                                EditCalendarTasks={EditCalendarTasks} setEditCalendarTasks={setEditCalendarTasks} setCalendarSidebar={setCalendarSidebar}
                                setNotificacionTime={setNotificacionTime} NotificacionTime={NotificacionTime}
                                setRepeatTime={setRepeatTime} RepeatTime={RepeatTime} ActiveConfig={ActiveConfig}
                                CalendarDataForEdit={CalendarDataForEdit} setCalendarDataForEdit={setCalendarDataForEdit}
                                setCalendarSideBarData={setCalendarSideBarData} setcalendarData={setcalendarData}
                            />
                            <CalendarCreate CalendarSideBarConfig={CalendarSideBarConfig} setCalendarSideBarConfig={setCalendarSideBarConfig} CalendarSideBarData={CalendarSideBarData}
                                CreateCalendarTasks={CreateCalendarTasks} setCreateCalendarTasks={setCreateCalendarTasks} setCalendarSidebar={setCalendarSidebar}
                                RepeatTime={RepeatTime} NotificacionTime={NotificacionTime} refreshData={refreshData} setCalendarSideBarData={setCalendarSideBarData}
                                setNotificacionTime={setNotificacionTime} setRepeatTime={setRepeatTime} ActiveConfig={ActiveConfig}
                                setcalendarData={setcalendarData} />
                        </div>

                        <CalendarSideBarConfigComponet
                            ConfigSideBarData={ConfigSideBarData} NotificacionTime={NotificacionTime} setNotificacionTime={setNotificacionTime}
                            CalendarSideBarConfig={CalendarSideBarConfig} setCalendarSideBarConfig={setCalendarSideBarConfig}
                            RepeatTime={RepeatTime} setRepeatTime={setRepeatTime} />


                        <CalendarSideBarComponents
                            EditCalendarTasks={EditCalendarTasks} setEditCalendarTasks={setEditCalendarTasks}
                            CreateCalendarTasks={CreateCalendarTasks} setCreateCalendarTasks={setCreateCalendarTasks}
                            CalendarSidebar={CalendarSidebar} setCalendarSidebar={setCalendarSidebar}
                            loading={loading} setloading={setloading} CalendarSideBarData={CalendarSideBarData}
                            setCalendarDataForEdit={setCalendarDataForEdit}
                        />

                    </div>
                    : <></>
            }

        </div>
    )
}