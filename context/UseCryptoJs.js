import CryptoJS from 'crypto-js';


const Encrypted = (type, data) => {

    if (type === 'JSON') {
        let encrypted = CryptoJS.DES.encrypt(`${JSON.stringify(data)}`, `${process.env.CryptoSecretKey}`);
        return encrypted
    }

    if (type === 'text') {
        let encrypted = CryptoJS.DES.encrypt(`${data}`, `${process.env.CryptoSecretKey}`);
        return encrypted
    }

}

const Decrypted = (type, data) => {

    if (type === 'JSON') {
        let bytes = CryptoJS.DES.decrypt(data, `${process.env.CryptoSecretKey}`);
        let decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return decrypted
    }

    if (type === 'text') {
        let bytes = CryptoJS.DES.decrypt(data, `${process.env.CryptoSecretKey}`);
        let decrypted = bytes.toString(CryptoJS.enc.Utf8)
        return decrypted
    }

}

export default { Encrypted, Decrypted }