import { Lato } from 'next/font/google'
import { useState } from 'react'
import axios from 'axios'


const latoBold = Lato({
    weight: '700',
    subsets: ['latin'],
})


const ForgetUserComponent = ({ ForgetUser, setForgetUser, setform }) => {

    const [SuccessMsg, setSuccessMsg] = useState(false)
    const [Email, setEmail] = useState('')
    const [errMsg, seterrMsg] = useState('')


    const exitForgetUser = () => {

        setForgetUser(false)
        setform(false)
        setSuccessMsg(false)
        setEmail('')
    }


    const sendEmail = async () => {
        if (Email !== '') {
            const respose = await axios.post(`https://api.mindfulmind.com.ar/ForgetPassword/forgetUser`, {
                "user": Email,
                "email": Email
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
                setSuccessMsg(true)
            }
        } else {
            seterrMsg('Complete su email')
            setTimeout(() => {
                seterrMsg('')
            }, 3500);
        }

    }


    return (
        <div className={`conteinerForgetPassword ${ForgetUser ? 'active' : ''}`}>
            {
                SuccessMsg
                    ? <>
                        <div className={`titleForgotPassword ${latoBold.className}`}>Ya enviamos tu usuario a tu email</div>

                        <div onClick={() => { exitForgetUser() }} className={`btnSendLoginBlack ${latoBold.className}`}>Volver</div>

                    </>
                    : <>


                        <div className={`conteinerForgetPassword ${ForgetUser ? 'active' : ''}`}>
                            <div className={`titleForgotPassword ${latoBold.className}`}>Ingrese su email para recuperar tu usuario</div>
                            <input placeholder="Email" className="FormsInputsBlack" onChange={(event) => {
                                setEmail(event.target.value);
                            }} />
                            <div onClick={() => { }} className={`btnSendLoginBlack ${latoBold.className}`}>Enviar</div>
                            <div className="TextActionFormBlack" onClick={() => { exitForgetUser() }} >Volver</div>
                        </div>


                    </>
            }
        </div>
    )
}


export default ForgetUserComponent
