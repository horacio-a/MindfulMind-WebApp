'use client'

import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import { useEffect, useState } from "react"
import Login from "@/components/login/login"
import Main from "@/components//Main"
import UseCryptoJs from "@/context/UseCryptoJs"
import axios from "axios"
import { getData } from "@/context/getData"
import Loading from "./Loading"

export default function Page() {
    const [sidebar, setSidebar] = useState(false)
    const [session, setsession] = useState(false)
    const [loading, setloading] = useState(true)
    const [routineData, setroutineData] = useState([])
    const [calendarData, setcalendarData] = useState([])
    const [TextData, setTextData] = useState([])
    const [page, setPage] = useState('Routine')

    useEffect(() => {
        async function sesionAuth() {
            if (window.localStorage.getItem('MindfulmindSession')) {
                const session = UseCryptoJs.Decrypted('JSON', window.localStorage.getItem('MindfulmindSession'))
                const response = await axios.post(`https://api.mindfulmind.com.ar/login/login/Encrypted`, { user: session.user, password: session.password }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response.data.authentication) {
                    setsession(true)
                    const data = await getData()
                    setcalendarData(data.CalendarData)
                    setroutineData(data.TasksData)
                    setTextData(data.TextData)
                    setTimeout(() => {
                        setloading(false)
                    }, 1000);

                } else {
                    window.localStorage.removeItem('MindfulmindSession')
                    setsession(false)
                    setTimeout(() => {
                        setloading(false)
                    }, 1000);
                }
            } else {
                setsession(false)
                setTimeout(() => {
                    setloading(false)
                }, 1000);
            }
        }
        sesionAuth()

    }, [])


    const refreshData = async () => {
        const data = await getData()
        setcalendarData(data.CalendarData)
        setroutineData(data.TasksData)
        setTextData(data.TextData)

    }


    return (
        <>
            {
                !loading
                    ? <>
                        {
                            session ? <>
                                {
                                    <>
                                        <Header setSidebar={setSidebar} sidebar={sidebar} refreshData={refreshData} />
                                        <div className="Content">
                                            <Sidebar sidebar={sidebar} page={page} setPage={setPage} />

                                            <Main sidebar={sidebar} routineData={routineData}
                                                setroutineData={setroutineData} calendarData={calendarData}
                                                setcalendarData={setcalendarData} TextData={TextData}
                                                setTextData={setTextData} page={page} setPage={setPage}
                                                loading={loading} setloading={setloading}
                                                refreshData={refreshData}
                                            />
                                        </div>
                                    </>
                                }</>
                                : <>
                                    <Login setsession={setsession} setcalendarData={setcalendarData}
                                        setroutineData={setroutineData}
                                        setTextData={setTextData} />
                                </>
                        }
                    </>
                    : <Loading />
            }


        </>

    )
}

