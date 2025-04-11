import { IMOVIEPRICE } from "./type"

export const findPrice = (
    id: number
) => {
    const priceList: IMOVIEPRICE[] = JSON.parse(localStorage.getItem('moviePrice') ?? "{}")
    if(Object.keys(priceList).length === 0)
        return Number(import.meta.env.VITE_DEFALUTPRICE)
    const price = priceList.find(p => p.id === id)
    if(!price)
        return Number(import.meta.env.VITE_DEFALUTPRICE)
    return price.price
}

export const getAllAdjustPrice = (): IMOVIEPRICE[]|undefined => {
    const json = localStorage.getItem('moviePrice')
    if(!json || json === 'undefined')
        return undefined
    return JSON.parse(json)
}

export const setAllAdjustPrice = (
    data: IMOVIEPRICE[]
) => {
    return localStorage.setItem('moviePrice', JSON.stringify(data))
}