import { Lato } from 'next/font/google'
import { useState } from 'react'
import axios from 'axios'


const latoBold = Lato({
    weight: '700',
    subsets: ['latin'],
})


const ForgetPasswordComponent = ({ forgetPassword, setforgetPassword, setform, setLoginUser }) => {
    const [errMsg, seterrMsg] = useState('')
    const [Email, setEmail] = useState('')
    const [Cod, setCod] = useState('')
    const [inputCod, setinputCod] = useState('')
    const [authEmail, setauthEmail] = useState(false)
    const [Authcod, setAuthcod] = useState(false)
    const [SuccessMsg, setSuccessMsg] = useState(false)
    const [password, setpassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')

    const exitForgetPassword = () => {

        setforgetPassword(false)
        setform(false)
        setauthEmail(false)
        setAuthcod(false)
        setSuccessMsg(false)
        setEmail('')
        setCod('')
        setpassword('')
        setConfirmPassword('')
    }


    const sendEmail = async () => {
        if (Email !== '') {
            const respose = await axios.post(`https://api.mindfulmind.com.ar/ForgetPassword/Authcod/forgetpassword`, {
                "data": {
                    "user": Email,
                    "email": Email
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (respose.data.error) {
                seterrMsg(respose.data.error)
                setTimeout(() => {
                    seterrMsg('')
                }, 3500);
            } else {
                setCod(respose.data.code)
                setauthEmail(true)
            }
        } else {
            seterrMsg('Complete su email')
            setTimeout(() => {
                seterrMsg('')
            }, 3500);
        }

    }

    const CheckAuthCode = async () => {
        console.log({
            "token": inputCod,
            "email": Email
        }
        )
        const respose = await axios.post(`https://api.mindfulmind.com.ar/ForgetPassword/checkAuthcode`, {
            "data": {
                "token": Cod,
                "email": Email
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(respose.data)
        if (respose.data.Authcode) {
            setAuthcod(true)
        } else {
            seterrMsg('Codigo incorrecto')
            setTimeout(() => {
                seterrMsg('')
            }, 3500);

        }



    }


    const changePassword = async () => {
        console.log({
            "token": Cod,
            "email": Email,
            "password": ConfirmPassword
        })
        if (password === ConfirmPassword) {
            const respose = await axios.post(`https://api.mindfulmind.com.ar/ForgetPassword/ChangePassword`, {
                "data": {
                    "token": Cod,
                    "email": Email,
                    "password": ConfirmPassword
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(respose.data)
            if (respose.data.error) {
                seterrMsg(respose.data.msg)

            } else {
                setSuccessMsg(true)
            }
        } else {
            seterrMsg('Las contraseñas no coinciden')
        }

    }

    return (
        <div className={`conteinerForgetPassword ${forgetPassword ? 'active' : ''}`}>
            {
                authEmail
                    ? <>{
                        Authcod
                            ? <>
                                {SuccessMsg
                                    ? <>
                                        <div className={`titleForgotPassword ${latoBold.className}`}>Tu Contraseñas ya cambio</div>

                                        <div onClick={() => { exitForgetPassword() }} className={`btnSendLoginBlack ${latoBold.className}`}>Volver</div>

                                    </>
                                    : <>
                                        <div className={`titleForgotPassword ${latoBold.className}`}>Ingrese su nueva contraseña</div>
                                        <input placeholder="contraseña" className="FormsInputsBlack" onChange={(event) => {
                                            setpassword(event.target.value);
                                        }} />
                                        <input placeholder="confirmar la contraseña" className="FormsInputsBlack" onChange={(event) => {
                                            setConfirmPassword(event.target.value);
                                        }} />
                                        <div onClick={() => { changePassword() }} className={`btnSendLoginBlack ${latoBold.className}`}>Siguiente</div>
                                        <div className={`errmsgForgotPassword ${latoBold.className}`} >{errMsg}</div>

                                        <div className="TextActionFormBlack" onClick={() => { exitForgetPassword() }} >Volver</div>

                                    </>}
                            </>
                            : <>
                                <div className={`titleForgotPassword ${latoBold.className}`}>Ingrese el codigo que enviamos a tu email</div>
                                <input placeholder="Codigo" className="FormsInputsBlack" onChange={(event) => {
                                    setinputCod(event.target.value);
                                }} />
                                <div onClick={() => { CheckAuthCode() }} className={`btnSendLoginBlack ${latoBold.className}`}>Siguiente</div>
                                <div className={`errmsgForgotPassword ${latoBold.className}`} >{errMsg}</div>

                                <div className="TextActionFormBlack" onClick={() => { exitForgetPassword() }} >Volver</div>
                            </>
                    }
                    </>
                    : <>
                        <div className={`titleForgotPassword ${latoBold.className}`}>Ingrese su email para recuperar tu contraseña</div>
                        <input placeholder="Email" type='email' className="FormsInputsBlack" onChange={(event) => {
                            setEmail(event.target.value);
                        }} />
                        <div onClick={() => { sendEmail() }} className={`btnSendLoginBlack ${latoBold.className}`}>Siguiente</div>
                        <div className={`errmsgForgotPassword ${latoBold.className}`} >{errMsg}</div>
                        <div className="TextActionFormBlack" onClick={() => { exitForgetPassword() }} >Volver</div>
                    </>
            }
        </div>
    )
}


export default ForgetPasswordComponent
