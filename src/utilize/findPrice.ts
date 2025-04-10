export const findPrice = (
    id: number
) => {
    const priceList: {id: number, price: number}[] = JSON.parse(localStorage.getItem('moviePrice') ?? "{}")
    if(Object.keys(priceList).length === 0)
        return import.meta.env.VITE_DEFALUTPRICE
    const price = priceList.find(p => p.id === id)
    if(!price)
        return import.meta.env.VITE_DEFALUTPRICE
    return price.price
}