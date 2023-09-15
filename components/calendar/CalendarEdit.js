

import axios from "axios"
import { RxTrash } from "react-icons/rx";
import { BiTimeFive } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { IoMdRepeat, IoIosNotificationsOutline, IoMdNotifications } from "react-icons/io";

import { useEffect, useState } from "react"
import { TimePicker, Switch } from 'antd'
import { Lato } from 'next/font/google'
import UseCryptoJs from "@/context/UseCryptoJs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);


const latoRegular = Lato({
    weight: '400',
    subsets: ['latin'],
})
const lato = Lato({
    weight: '700',
    subsets: ['latin'],
})


export default function CalendarEdit({ ActiveConfig, CalendarDataForEdit, setCalendarDataForEdit, setEditCalendarTasks, setCalendarSidebar, EditCalendarTasks, setNotificacionTime,
    NotificacionTime, setRepeatTime, setCalendarSideBarData, setCalendarSideBarConfig, setcalendarData }) {
    const format = 'HH:mm';
    const [Fromvalue, setFromValue] = useState(null);
    const [Tovalue, setToValue] = useState(null);
    const [editAll, seteditAll] = useState(false)
    const [DeleteBanner, setDeleteBanner] = useState(false)
    const [viewColorPicker, setviewColorPicker] = useState(false)
    const [ColorSelect, setColorSelect] = useState('#E71818')
    const [Fecha, setFecha] = useState('')
    const [Title, setTitle] = useState()
    const [titleMsgErr, settitleMsgErr] = useState('');
    const [Note, setNote] = useState('')
    useEffect(() => {
        if (CalendarDataForEdit) {
            console.log(CalendarDataForEdit)
            setColorSelect(CalendarDataForEdit.colorHex)
            setTitle(CalendarDataForEdit.title)
            setNote(CalendarDataForEdit.description)
        }

    }, [EditCalendarTasks])

    useEffect(() => {
        if (CalendarDataForEdit) {

            const desplazamientoMinutos = new Date(CalendarDataForEdit.intialHour).getTimezoneOffset();
            let timeFrom = new Date(
                new Date(CalendarDataForEdit.intialHour).getTime() - desplazamientoMinutos * 60000
            );
            let timeto = new Date(
                new Date(CalendarDataForEdit.finishHour).getTime() - desplazamientoMinutos * 60000
            );
            setTimeValue([dayjs(timeFrom.toISOString().split('T')[1], "HH:mm"), dayjs(timeto.toISOString().split('T')[1], "HH:mm")])
            setDateFrom(new Date(CalendarDataForEdit.intialHour))
            setDateTo(new Date(CalendarDataForEdit.finishHour))

        }
    }, [EditCalendarTasks])

    useEffect(() => {
        if (CalendarDataForEdit) {

            const diferencia = new Date(CalendarDataForEdit.intialHour).getTime() - CalendarDataForEdit.notificationFilter
            switch (diferencia) {
                case 600000:
                    setNotificacionTime('10 minutos antes')
                    break;
                case 3600000:
                    setNotificacionTime('1 hora antes')
                    break;
                case 86400000:
                    setNotificacionTime('1 dia antes')
                    break;
                default:
                    setNotificacionTime('Al momento')
                    break;
            }
        }
    }, [EditCalendarTasks])

    useEffect(() => {
        if (CalendarDataForEdit) {

            if (CalendarDataForEdit.intialHour.split('T')[1] === '00:00:00.000Z' && CalendarDataForEdit.finishHour.split('T')[1] === '23:59:59.999Z') {
                setAllDay(true)
            } else {
                setAllDay(false)
            }
        }
    }, [EditCalendarTasks])

    const [dateTo, setDateTo] = useState(new Date());
    const [dateFrom, setDateFrom] = useState(new Date());

    const [TimeValue, setTimeValue] = useState(null);

    const [AllDay, setAllDay] = useState()

    const onChangeFrom = (time) => {
        setFromValue(time);
    };
    const onChangeTo = (time) => {
        setToValue(time);
    };



    const onChangeTime = (time, dateString) => {
        console.log(dateString)
        setTimeValue(time);
        setDateFrom(time[0].$d)
        setDateTo(time[1].$d)
    };


    const closeEditCalendar = () => {
        seteditAll(false)
        setDeleteBanner(false)
        setEditCalendarTasks(false)
        setCalendarSidebar(true)
        setCalendarSideBarConfig(false)
        setTitle('')
        setNote('')
        setTimeValue(null)
        setNotificacionTime('Al momento')
        setRepeatTime('Nunca')
    }


    const notificationFilterGet = (text) => {
        let notificationFilter
        switch (text) {
            case '10 minutos antes':
                notificationFilter = new Date(dateFrom).getTime() - 600000
                break;
            case '1 hora antes':
                notificationFilter = new Date(dateFrom).getTime() - 3600000
                break;

            case '1 dia antes':
                notificationFilter = new Date(dateFrom).getTime() - 86400000
                break;

            default:
                notificationFilter = new Date(dateFrom).getTime()
                break;
        }
        return notificationFilter
    }

    const UpdateTasks = async () => {
        let user = UseCryptoJs.Decrypted('JSON', window.localStorage.getItem('MindfulmindSession'))

        let data = {
            id: CalendarDataForEdit.id,
            GroupId: CalendarDataForEdit.GroupId,
            user: user.user,
            title: Title,
            description: Note,
            date: CalendarDataForEdit.date,
            intialHour: dateFrom.toISOString(),
            finishHour: dateTo.toISOString(),
            colorHex: ColorSelect,
            category: CalendarDataForEdit.category,
            idCalendar: CalendarDataForEdit.idCalendar,
            notificationFilter: notificationFilterGet(NotificacionTime),
            groupedTask: CalendarDataForEdit.groupedTask,
        }
        let info = {
            AllDay,
            NotificacionTime
        }


        if (info.AllDay) {
            data.intialHour = data.intialHour.split('T')[0] + 'T00:00:00.000Z'
            data.finishHour = data.finishHour.split('T')[0] + 'T23:59:59.999Z'
        }

        if (JSON.stringify(data) == JSON.stringify(CalendarDataForEdit)) {
            closeEditCalendar()
        } else {
            let response
            delete data.groupedTask;
            if (editAll === false) {
                response = await axios.post(`https://api.mindfulmind.com.ar/calendar/update`, { data: data, info: editAll })
            }
            if (editAll === true) {
                response = await axios.post(`https://api.mindfulmind.com.ar/calendar/updategroup`, { data, info })
            }
            const newdata = response.data.days.findIndex((element) => element.fecha === CalendarDataForEdit.date)
            setCalendarSideBarData(response.data.days[newdata])
            closeEditCalendar()

        }

    }


    const deleteCalendarTasks = async () => {
        let user = UseCryptoJs.Decrypted('JSON', window.localStorage.getItem('MindfulmindSession'))

        if (editAll === false) {
            let response = await axios.delete(`https://api.mindfulmind.com.ar/calendar/delete`, { data: { user: user.user, id: CalendarDataForEdit.id, idCalendar: CalendarDataForEdit.idCalendar } })
            const newdata = response.data.days.findIndex((element) => element.fecha === CalendarDataForEdit.date)
            setCalendarSideBarData(response.data.days[newdata])
            setcalendarData(response.data)

        }
        if (editAll === true) {
            let response = await axios.delete(`https://api.mindfulmind.com.ar/calendar/deletegroup`, { data: { user: user.user, id: CalendarDataForEdit.GroupId, idCalendar: CalendarDataForEdit.idCalendar } })
            const newdata = response.data.days.findIndex((element) => element.fecha === CalendarDataForEdit.date)
            setCalendarSideBarData(response.data.days[newdata])
            setcalendarData(response.data)
        }

        closeEditCalendar()

    }

    return (
        <div className={`editCalendar  ${EditCalendarTasks ? 'active' : 'desactive'}`}>
            <div className="conteinerEditRelative">
                <div className="conteinerEditedContent">
                    <div className="ConteinerTitleInput">
                        <input placeholder="Titulo de su tarea" value={Title} className="inputTitle" type="text" onChange={(event) => {
                            setTitle(event.target.value);
                        }} />
                        <div className="ConteinerBtn">
                            <div style={{ backgroundColor: ColorSelect }} onClick={() => { viewColorPicker ? setviewColorPicker(false) : setviewColorPicker(true) }} className="BtnColorPicker"></div>
                        </div>
                        <div className="ConteinerBtn">
                            <RxTrash onClick={() => { setDeleteBanner(true) }} size={30} color="#fff" style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                    <div className={`ErrorTitle ${titleMsgErr !== '' ? 'active' : 'descative'} `}>{titleMsgErr}</div>
                    <div className={`blockColorPicker  ${viewColorPicker ? 'active' : 'desactive'}`}>

                        <div className={`conteinerColorPiker ${viewColorPicker ? 'active' : 'desactive'}`}>
                            <div className="BtnColorPicker" onClick={() => { setColorSelect('#E71818'); setviewColorPicker(false) }} style={{ backgroundColor: '#E71818' }}></div>
                            <div className="BtnColorPicker" onClick={() => { setColorSelect('#E7AD18'); setviewColorPicker(false) }} style={{ backgroundColor: '#E7AD18' }}></div>
                            <div className="BtnColorPicker" onClick={() => { setColorSelect('#B1E718'); setviewColorPicker(false) }} style={{ backgroundColor: '#B1E718' }}></div>
                            <div className="BtnColorPicker" onClick={() => { setColorSelect('#18E79C'); setviewColorPicker(false) }} style={{ backgroundColor: '#18E79C' }}></div>
                            <div className="BtnColorPicker" onClick={() => { setColorSelect('#18A9E7'); setviewColorPicker(false) }} style={{ backgroundColor: '#18A9E7' }}></div>
                            <div className="BtnColorPicker" onClick={() => { setColorSelect('#1845E7'); setviewColorPicker(false) }} style={{ backgroundColor: '#1845E7' }}></div>
                            <div className="BtnColorPicker" onClick={() => { setColorSelect('#6718E7'); setviewColorPicker(false) }} style={{ backgroundColor: '#6718E7' }}></div>
                            <div className="BtnColorPicker" onClick={() => { setColorSelect('#A418E7'); setviewColorPicker(false) }} style={{ backgroundColor: '#A418E7' }}></div>


                        </div>
                    </div>
                    <div className="conteinerSwitch">
                        <div className="titleSwitch">

                            <BiTimeFive />
                            {
                                AllDay ?
                                    <>
                                        <>&nbsp;</>
                                        Todo el dia
                                    </>
                                    : <>
                                        <>&nbsp;</>
                                        Seleccione el horario
                                    </>
                            }
                        </div>
                        <Switch value={AllDay} style={AllDay ? { backgroundColor: ColorSelect } : {}} onChange={() => { AllDay ? setAllDay(false) : setAllDay(true) }} />
                    </div>

                    {
                        AllDay ? <div className="titleFecha">{Fecha}</div>
                            :
                            <div className="conteinerTime">
                                <div className="titleFecha">{Fecha}</div>
                                <TimePicker.RangePicker format={format} value={TimeValue} onChange={onChangeTime} className="timePicker" colorTextPlaceholder='rgba(0, 0, 0)' colorText='#fff' />

                            </div>
                    }

                    {
                        CalendarDataForEdit ?
                            <div className={`ConteinerConfig ${CalendarDataForEdit.groupedTask ? ' space-between' : ''}`} >
                                {
                                    CalendarDataForEdit.groupedTask
                                        ? <div className="ConteinerGroupedTask">
                                            <div className="conteinerTitle">
                                                <AiOutlineInfoCircle color="#fff" />

                                                <div className="titleGroupedTask">
                                                    ¿Quieres editar todas los recordatorios?
                                                </div>
                                            </div>
                                            <div className="conteinerBtnsGroupedTask">
                                                <button onClick={() => { seteditAll(false) }} className={`BtnGroupedTask ${!editAll ? 'active' : 'desactive'}`}>Editar solo este</button>
                                                <button onClick={() => { seteditAll(true) }} className={`BtnGroupedTask ${editAll ? 'active' : 'desactive'}`}>Editar todos</button>

                                            </div>
                                        </div>
                                        : <></>
                                }

                                <div className="ConteinerDescription">
                                    <FiFileText color="#fff" />
                                    <input className="inputConfigCalendar" value={Note} placeholder="Descripcion" onChange={(event) => {
                                        setNote(event.target.value);
                                    }} />
                                </div>
                                <div className="ConteinerDescription">
                                    <IoMdNotifications color="#fff" />
                                    <div onClick={() => { ActiveConfig({ Title: 'Notificacion', Data: ['Al momento', '10 minutos antes', '1 hora antes', '1 dia antes'] }) }} className="btnNotification">
                                        {NotificacionTime}
                                    </div>
                                </div>




                            </div>
                            : <></>
                    }

                </div>
                <div className="controlBtns">
                    <div onClick={() => { closeEditCalendar() }} className="BtnsEdited left">
                        Cancelar
                    </div>
                    <div onClick={() => { UpdateTasks() }} className="BtnsEdited rigth">
                        Guardar
                    </div>
                </div>
                <div className={`conteinerDelete ${DeleteBanner ? 'active' : ''}`} >
                    <div style={{ width: '100%', height: '100%' }} onClick={() => { setDeleteBanner(false) }}></div>
                    <div className="conteinerDeleteLabel">
                        <div className="titleDelete">
                            <div className={`${lato.className}`}>Espera</div>
                            ¿Seguro quieres eliminar este recordatorio?

                        </div>
                        <div className=" ConteinerBtnDelete">
                            <div className="deleteBtn" onClick={() => { deleteCalendarTasks() }}>Si </div>
                            <div className="NotDeleteBtn" onClick={() => { setDeleteBanner(false) }}>No</div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}