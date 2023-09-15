import axios from "axios"
import UseCryptoJs from "./UseCryptoJs";
const getData = async () => {
    const session = UseCryptoJs.Decrypted('JSON', window.localStorage.getItem('MindfulmindSession'))

    const respose = await axios.post(
        `https://api.mindfulmind.com.ar/getData/all`,
        {
            obj: {
                Calendar: {
                    user: session.user,
                    idCalendar: 'Calendario Principal',
                },
                Tasks: {
                    user: session.user,
                },
                Text: {
                    user: session.user,
                },
            },
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return respose.data;
}

export { getData }