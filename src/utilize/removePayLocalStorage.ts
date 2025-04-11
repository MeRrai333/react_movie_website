import { PAYITEMLOCALSTORAGE, PAYLOCALSTORAGE } from "../pages/WaitPayPage"

export const autoRemovePaymentLocalStorage = () => {
    const startTimeTemp = localStorage.getItem(PAYLOCALSTORAGE)
    if(startTimeTemp){
        const diffSecTime = 60-Math.floor(((new Date()).getTime() - (new Date(startTimeTemp!)).getTime())/1000)
        if(diffSecTime < 0){
            localStorage.removeItem(PAYLOCALSTORAGE)
            localStorage.removeItem(PAYITEMLOCALSTORAGE)
            return true;
        }
    }
    return false;
}

export const removePaymentLocalStorage = () => {
    localStorage.removeItem(PAYLOCALSTORAGE)
    localStorage.removeItem(PAYITEMLOCALSTORAGE)
}