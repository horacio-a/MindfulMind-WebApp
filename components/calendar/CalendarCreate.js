import axios from "axios"
import { RxTrash } from "react-icons/rx";
import { BiTimeFive } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";
import { IoMdRepeat, IoIosNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { useEffect, useState } from "react"
import { TimePicker, Switch } from 'antd'
import { Lato } from 'next/font/google'
import UseCryptoJs from "@/context/UseCryptoJs";

const latoRegular = Lato({
    weight: '400',
    subsets: ['latin'],
})
const lato = Lato({
    weight: '700',
    subsets: ['latin'],
})


export default function CalendarCreate({ setcalendarData, setNotificacionTime, setRepeatTime, setCalendarSideBarData, RepeatTime,
    NotificacionTime, ActiveConfig, CalendarSideBarConfig, setCalendarSideBarConfig, CreateCalendarTasks, setCreateCalendarTasks,
    setCalendarSidebar, loading, setloading, CalendarSideBarData, refreshData }) {

    const [viewColorPicker, setviewColorPicker] = useState(false)
    const [ColorSelect, setColorSelect] = useState('#E71818')
    const [Fecha, setFecha] = useState('')
    const [Title, setTitle] = useState('')
    const [titleMsgErr, settitleMsgErr] = useState('');
    const [Note, setNote] = useState('')

    const [dateTo, setDateTo] = useState(new Date());
    const [dateFrom, setDateFrom] = useState(new Date());

    const format = 'HH:mm';
    const [TimeValue, setTimeValue] = useState(null);

    const [AllDay, setAllDay] = useState(true)

    useEffect(() => {
        if (CalendarSideBarData) {
            let fecha = new Date(CalendarSideBarData.fecha);
            let diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            let diaDeLaSemana = diasSemana[fecha.getUTCDay()];
            let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            let mes = meses[fecha.getUTCMonth()];
            let textoFormateado = diaDeLaSemana + ' ' + fecha.getUTCDate() + ', ' + mes + ' ' + fecha.getUTCFullYear();
            setFecha(textoFormateado)
        }

    }, [CalendarSideBarData])


    const onChangeTime = (time) => {
        setTimeValue(time);
        setDateFrom(time[0].$d)
        setDateTo(time[1].$d)
    };


    const CreateTasks = async () => {
        let user = UseCryptoJs.Decrypted('JSON', window.localStorage.getItem('MindfulmindSession'))

        if (Title === '') {
            settitleMsgErr('Para crear una tarea necesitas escribir un titulo')
            setTimeout(() => {
                settitleMsgErr('')
            }, 3500);
            return
        }

        const response = await axios.post(`https://api.mindfulmind.com.ar/calendar/create`, {
            data: {
                "user": user.user,
                "Title": Title,
                "intialHour": CalendarSideBarData.fecha.split('T')[0] + 'T' + dateFrom.toISOString().split('T')[1],
                "finishHour": CalendarSideBarData.fecha.split('T')[0] + 'T' + dateTo.toISOString().split('T')[1],
                "idCalendar": "Calendario Principal",
                "description": Note,
                "date": CalendarSideBarData.fecha,
                "colorHex": ColorSelect,
                "category": "principal"
            },
            info: {
                Allday: !AllDay,
                repeat: RepeatTime,
                NotificacionTime: NotificacionTime
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.data.err) {
            closeCreateCalendar()
            let index = response.data.days.findIndex((element) => element.id === CalendarSideBarData.id)
            setCalendarSideBarData(response.data.days[index])
            setcalendarData(response.data)
        }

    }


    const closeCreateCalendar = () => {
        setCreateCalendarTasks(false)
        setCalendarSidebar(true)
        setCalendarSideBarConfig(false)
        setTitle('')
        setNote('')
        setTimeValue(null)
        setNotificacionTime('Al momento')
        setRepeatTime('Nunca')
    }



    return (
        <div className={`editCalendar  ${CreateCalendarTasks ? 'active' : 'desactive'}`}>
            <div className="conteinerEditedContent">
                <div className="ConteinerTitleInput">
                    <input placeholder="Titulo de su tarea" value={Title} className="inputTitle" type="text" onChange={(event) => {
                        setTitle(event.target.value);
                    }} />
                    <div className="ConteinerBtn">
                        <div style={{ backgroundColor: ColorSelect }} onClick={() => { viewColorPicker ? setviewColorPicker(false) : setviewColorPicker(true) }} className="BtnColorPicker"></div>
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
                    <Switch defaultChecked={AllDay} style={AllDay ? { backgroundColor: ColorSelect } : {}} onChange={() => { AllDay ? setAllDay(false) : setAllDay(true) }} />
                </div>

                {
                    AllDay ? <div className="titleFecha">{Fecha}</div>
                        :
                        <div className="conteinerTime">
                            <div className="titleFecha">{Fecha}</div>
                            <TimePicker.RangePicker format={format} value={TimeValue} onChange={onChangeTime} className="timePicker" colorTextPlaceholder='rgba(0, 0, 0)' colorText='#fff' />

                        </div>
                }

                <div className="ConteinerConfig">
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
                    <div className="ConteinerDescription">
                        <IoMdRepeat color="#fff" />
                        <div onClick={() => { ActiveConfig({ Title: 'Repeticion', Data: ['Nunca', 'Todas las semanas', 'Todos los meses', 'Todos los años'] }) }} className="btnNotification">
                            {RepeatTime}
                        </div>
                    </div>



                </div>


            </div>
            <div className="controlBtns">
                <div onClick={() => { closeCreateCalendar() }} className="BtnsEdited left">
                    Cancelar
                </div>
                <div onClick={() => { CreateTasks() }} className="BtnsEdited rigth">
                    Guardar
                </div>
            </div>
        </div>
    )
}