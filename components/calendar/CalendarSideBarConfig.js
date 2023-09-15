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


export default function CalendarSideBarConfigComponet({ CalendarSideBarConfig, setCalendarSideBarConfig, ConfigSideBarData,
    RepeatTime, setRepeatTime, NotificacionTime, setNotificacionTime }) {
    const [name, setName] = useState('')
    useEffect(() => {
        setName(ConfigSideBarData.Title === 'Notificacion' ? NotificacionTime : RepeatTime)
    }, [CalendarSideBarConfig])

    useEffect(() => {
        console.log(name)
    }, [name])


    return (
        <div className={`CalendarSideBar ${CalendarSideBarConfig ? 'active' : 'desactive'} `}>
            {
                CalendarSideBarConfig
                    ? <div style={{ height: '100%', width: '100%' }}>
                        <div className="TitleSideBar" >

                            <div className="text">
                                {ConfigSideBarData.Title}

                            </div>
                        </div>
                        <div className="conteinerList">

                            {
                                ConfigSideBarData.Data.map((item) => {

                                    return (
                                        <div className="unitListConfig">
                                            <div className="conteinerCheck" onClick={() => {

                                                if (ConfigSideBarData.Title === 'Notificacion') {
                                                    console.log('hola')
                                                    setNotificacionTime(item)
                                                    setName(item)
                                                } else {
                                                    console.log('hola2')
                                                    setRepeatTime(item)
                                                    setName(item)
                                                }
                                            }}>
                                                <svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="Group 1">
                                                        {
                                                            item === name
                                                                ? <circle id="inside" cx="67" cy="67" r="35" fill="white" />
                                                                : <></>
                                                        }

                                                        <circle id="outside" cx="67.5" cy="67.5" r="63" stroke="white" stroke-width="12" />
                                                    </g>
                                                </svg>


                                            </div>
                                            <div onClick={() => {

                                                if (ConfigSideBarData.Title === 'Notificacion') {
                                                    console.log('hola')
                                                    setNotificacionTime(item)
                                                    setName(item)
                                                } else {
                                                    console.log('hola2')
                                                    setRepeatTime(item)
                                                    setName(item)
                                                }
                                            }} className="titleConfig">{item}</div>
                                        </div>

                                    )
                                })
                            }

                        </div>

                        <div onClick={() => { setCalendarSideBarConfig(false) }} className="BtnBack">
                            <div>
                                Cerrar
                            </div>
                        </div>

                    </div>
                    : <></>
            }
        </div>
    )
}