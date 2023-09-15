import '../../app/globals.css'

import { use, useState } from "react"
import { Lato } from 'next/font/google'
import axios from "axios"
import { HiEye, HiEyeOff } from "react-icons/hi";
import ForgetUserComponent from './ForgetUser';
import ForgetPasswordComponent from './ForgetPassword';
import UseCryptoJs from '@/context/UseCryptoJs';
import { getData } from "@/context/getData"

const lato = Lato({
    weight: '400',
    subsets: ['latin'],
})


const latoBold = Lato({
    weight: '700',
    subsets: ['latin'],
})

const Login = ({ setsession, setcalendarData, setroutineData, setTextData }) => {

    const [register, setregister] = useState(false)
    const [forgetPassword, setforgetPassword] = useState(false)
    const [ForgetUser, setForgetUser] = useState(false)
    const [form, setform] = useState(false)
    const [loginUser, setLoginUser] = useState('')
    const [loginPass, setloginPass] = useState('')
    const [loginPassVisibility, setloginPassVisibility] = useState(true)
    const [errMsg, seterrMsg] = useState('')


    const [registerUser, setregisterUser] = useState('')
    const [registerEmail, setregisterEmail] = useState('')
    const [registerPassword, setregisterPassword] = useState('')
    const [registerConfirm, setregisterConfirm] = useState('')
    const [registerPasswordVisibility, setregisterPasswordVisibility] = useState(true)
    const [registerConfirmVisibility, setregisterConfirmVisibility] = useState(true)

    const FormCheck = () => {
        let fail = false
        if (loginUser === '') {
            seterrMsg('Por favor ingrese su usuario')
            setTimeout(() => {
                seterrMsg('')
            }, 3500);
            fail = true
        }
        if (loginPass === '') {
            seterrMsg('Por favor ingrese su contraseña')
            setTimeout(() => {
                seterrMsg('')
            }, 3500);
            fail = true
        }
        if (fail === true) {
            return false
        }
        return true
    }

    const LoginFuntion = async () => {
        if (FormCheck() === true) {
            console.log(loginPass, loginUser)
            const response = await axios.post(`https://api.mindfulmind.com.ar/login/login`, { user: loginUser, password: loginPass }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(response.data)
            if (response.data.authentication === true) {

                let responseEncrypted = UseCryptoJs.Encrypted('JSON', response.data)
                window.localStorage.setItem('MindfulmindSession', responseEncrypted)

                const data = await getData()
                setcalendarData(data.CalendarData)
                setroutineData(data.TasksData)
                setTextData(data.TextData)


                setsession(responseEncrypted)

            } else if (response.data.authentication === false) {
                seterrMsg(response.data.errMsg)
                setTimeout(() => {
                    seterrMsg('')
                }, 3500);
            }
        }

    }


    const checkEmptyForm = () => {
        if (registerEmail === '') {
            seterrMsg('Ingrese su email por favor')
            setTimeout(() => {
                seterrMsg('')
            }, 4000);
        }
        if (registerUser === '') {
            seterrMsg('Ingrese un usuario por favor')
            setTimeout(() => {
                seterrMsg('')
            }, 4000);
        }

        if (registerPassword === '') {
            seterrMsg('Ingrese su contraseña por favor')
            setTimeout(() => {
                seterrMsg('')
            }, 4000);
        }
        if (registerConfirm === '') {
            seterrMsg('Confirme su contraseña por favor')
            setTimeout(() => {
                seterrMsg('')
            }, 4000);
        }
    }

    const sendRegister = async () => {

        checkEmptyForm()

        if (registerPassword != '' && registerConfirm != '' && registerEmail != '' && registerUser != '') {

            if (registerPassword == registerConfirm) {
                let obj = {
                    user: registerUser,
                    password: registerPassword,
                    email: registerEmail
                }
                const data = await axios.post(`https://api.mindfulmind.com.ar/login/register`, { obj }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (data.data.userCreate === false) {
                    if (data.data.error.email === true) {
                        seterrMsg('Email ya registrado')
                        setTimeout(() => {
                            seterrMsg('')
                        }, 4000);
                    }
                    if (data.data.error.user === true) {
                        seterrMsg('Usuario ya registrado eligi otro por favor')
                        setTimeout(() => {
                            seterrMsg('')
                        }, 4000);
                    }
                }
                if (data.data.userCreate === true) {
                    setregister(true)
                    setform(false)
                }
            } else {
                seterrMsg('Las Contraseñas no coinciden')
                setTimeout(() => {
                    seterrMsg('')
                }, 3500);
            }
        }
    }

    const changeForm = () => {
        form ? setform(false) : setform(true)
        seterrMsg('')
    }




    return (
        <>

            <>
                {<main className={`mainLogin ${lato.className}`} >
                    <div className="conteinerImg">
                        <img src="/logoLogin.svg" style={{ height: '65%' }}></img>
                    </div>
                    <div className="conteinerMain">
                        <div className="conteinerForm">
                            <div className="login">
                                <input style={{ marginTop: '27%' }} placeholder="Usuario" className="FormsInputs" onChange={(event) => {
                                    setLoginUser(event.target.value);
                                }} />
                                <div className="conteinerPassword">
                                    <input style={{ marginLeft: '15%' }} type={loginPassVisibility ? "text" : "password"} placeholder={"Contraseña"} className="FormsInputs" onChange={(event) => {
                                        setloginPass(event.target.value);
                                    }} />
                                    <div className="conteinerIconPassword">
                                        {
                                            loginPassVisibility
                                                ? <HiEye style={{ cursor: 'pointer' }} onClick={() => { setloginPassVisibility(false) }} color="#fff" size={23} />
                                                : <HiEyeOff style={{ cursor: 'pointer' }} onClick={() => { setloginPassVisibility(true) }} color="#fff" size={23} />
                                        }
                                    </div>
                                </div>
                                <div className="TextActionForm" onClick={() => { setforgetPassword(true); setform(true) }} >¿Olvidaste tu Contraseña?</div>
                                <div className="TextActionForm" onClick={() => { setForgetUser(true); setform(true) }} >¿Olvidaste tu Usuario?</div>
                                <div className="TextActionForm" onClick={() => { changeForm() }} >Crear un cuenta</div>
                                <div onClick={() => { LoginFuntion() }} className={`btnSendLogin ${latoBold.className}`}>Enviar</div>
                                <div className={`errmsg ${latoBold.className}`} >{errMsg}</div>
                            </div>
                            <div className="register">
                                <input style={{ marginTop: '7.5%' }} placeholder="Email" className="FormsInputs" onChange={(event) => {
                                    setregisterEmail(event.target.value);
                                }} />
                                <input placeholder="Usuario" className="FormsInputs" onChange={(event) => {
                                    setregisterUser(event.target.value);
                                }} />
                                <div style={{ marginLeft: '30%' }} className="conteinerPassword">
                                    <input placeholder="Contraseña" type={registerPasswordVisibility ? "text" : "password"} className="FormsInputs" onChange={(event) => {
                                        setregisterPassword(event.target.value);
                                    }} />
                                    <div className="conteinerIconPassword">
                                        {
                                            registerPasswordVisibility
                                                ? <HiEye style={{ cursor: 'pointer' }} onClick={() => { setregisterPasswordVisibility(false) }} color="#fff" size={23} />
                                                : <HiEyeOff style={{ cursor: 'pointer' }} onClick={() => { setregisterPasswordVisibility(true) }} color="#fff" size={23} />
                                        }
                                    </div>
                                </div>
                                <div style={{ marginLeft: '30%' }} className="conteinerPassword">
                                    <input placeholder="Confirma tu contraseña" type={registerConfirmVisibility ? "text" : "password"} className="FormsInputs" onChange={(event) => {
                                        setregisterConfirm(event.target.value);
                                    }} />
                                    <div className="conteinerIconPassword">
                                        {
                                            registerConfirmVisibility
                                                ? <HiEye style={{ cursor: 'pointer' }} onClick={() => { setregisterConfirmVisibility(false) }} color="#fff" size={23} />
                                                : <HiEyeOff style={{ cursor: 'pointer' }} onClick={() => { setregisterConfirmVisibility(true) }} color="#fff" size={23} />
                                        }
                                    </div>
                                </div>


                                <div className="TextActionForm" onClick={() => { changeForm() }} >Ya tengo cuenta</div>

                                <div onClick={() => { sendRegister() }} className={`btnSendLogin ${latoBold.className}`}>Enviar</div>

                                <div className={`errmsg ${latoBold.className}`} >{errMsg}</div>


                            </div>

                            <div className={`conteinerTexto ${form ? 'login' : 'register'}`}></div>
                            <ForgetPasswordComponent forgetPassword={forgetPassword}
                                setforgetPassword={setforgetPassword}
                                setform={setform} setLoginUser={setLoginUser} />
                            <ForgetUserComponent
                                ForgetUser={ForgetUser}
                                setForgetUser={setForgetUser}
                                setform={setform} setLoginUser={setLoginUser}
                            />
                            <div className={`conteinerRegister ${register ? 'active' : ''}`}>
                                <div className={`titleForgotPassword ${latoBold.className}`}>Felicitaciones solo queda confirmar tu email</div>
                                <div onClick={() => { setregister(false) }} className={`btnSendLoginBlack ${latoBold.className}`}>Volver</div>
                            </div>
                        </div>
                    </div>

                </main>}
            </>
        </>
    )
}
export default Login