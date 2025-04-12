import { useEffect, useState } from "react";
import { COLORS } from "../constant";
import PriceSection from "../components/PriceSection";
import { removePaymentLocalStorage } from "../utilize/removePayLocalStorage";

export const PAYLOCALSTORAGE = 'startPayTime'
export const PAYITEMLOCALSTORAGE = 'payItem'

interface IPaymentInfo {
    bankName: string,
    name: string
    bankNumber: string
}

const BankingInfoList: IPaymentInfo[] = [
    {
        bankName: "Bank 1",
        name: "MM React Movie company",
        bankNumber: "123-4567-890"
    },
    {
        bankName: "Bank 2",
        name: "Mr. Methit Sompita",
        bankNumber: "098-7654-321"
    },
    {
        bankName: "Bank 3",
        name: "Mr. Ethan James Carter",
        bankNumber: "111-2222-333"
    }
]

const LINESECTION = "border-b-3 p-4"

export default function WaitPayPage(){
    console.log(localStorage.getItem(PAYITEMLOCALSTORAGE))
    const [itemList, _] = useState(
        localStorage.getItem(PAYITEMLOCALSTORAGE) !== null
            ? JSON.parse(localStorage.getItem(PAYITEMLOCALSTORAGE)!)
            : undefined
    )
    const [timestamp, __] = useState(new Date().getTime())
    const [countDown, setCountDown] = useState(0)
    const [intervalId, setIntervalId] = useState<number|null>(null);
    const [paymentInfo, setPaymentInfo] = useState<IPaymentInfo[]|null>(null)
    const [isSucces, setIsSucees] = useState<boolean|null>(null)

    useEffect(() => {
        document.title = `${import.meta.env.VITE_WEBNAME} | Cart pay`
        const startTimeTemp = localStorage.getItem(PAYLOCALSTORAGE)
        if(!startTimeTemp || !itemList){
            alert('Didn\'t have any order or order has timeout')
            window.close()
            return;
        }
        const diffSecTime = 60-Math.floor(((new Date()).getTime() - (new Date(startTimeTemp!)).getTime())/1000)
        if(diffSecTime < 0){
            removePaymentLocalStorage()
            alert('Out of time to pay!')
            window.close()
            return;
        }

        setPaymentInfo(BankingInfoList)
        setCountDown(diffSecTime)
        const countDownTimer = setInterval(() => {
            setCountDown(prev => prev-1)
        }, 1000)
        setIntervalId(countDownTimer)
        return () => {
            clearInterval(countDownTimer)
        }
    }, [])

    useEffect(() => {
        if(countDown < 0){
            removePaymentLocalStorage()
            setCountDown(0)
            clearInterval(intervalId!)
            setIntervalId(null)
            setTimeout(() => { 
                setIsSucees(confirm(`\nThis is example, Please select which UI you want to see\n OK: Success payment\t Cancel: Failed payment`))
            }, 3000)
        }
    }, [countDown])

    if(!itemList)
        return <></>
        
    return <main
        className={`${COLORS.bg.tertiary} min-h-screen h-fit p-4 text-white flex justify-center pt-4 px-6 flex-col w-full`}
    >
        <div
            className="w-full flex justify-center"
        >
            <div
                className={`${COLORS.bg.primary} w-full md:w-2/3 p-4 rounded-md flex flex-col gap-2`}
            >
                <h1
                    className="text-xl uppercase font-bold"
                >
                    Payment
                </h1>
                <p>
                    Please pay within
                </p>
                <div
                    className={`text-7xl font-bold text-center ${LINESECTION}`}
                >
                    {
                        isSucces === null
                            ? countDown > 0
                                ? countDown
                                : 'Timeout'
                            : isSucces
                                ? <>
                                    Success paid
                                </>
                                : <>
                                    Failed to Paid
                                    <div
                                        className="font-normal text-base underline"
                                    >
                                        If you have any issue please contact seller
                                    </div>
                                </>
                    }
                </div>
                <div
                    className={`${LINESECTION}`}
                >
                    <h3
                        className="text-lg uppercase font-bold"
                    >
                        Item info
                    </h3>
                    <div
                        className="flex justify-between"
                    >
                        <div
                            className="font-bold"
                        >
                            Order ID
                        </div>
                        <div>
                            MRM{timestamp}
                        </div>
                    </div>
                    <PriceSection 
                        cart={itemList}
                    />
                </div>
                <div
                    className={`${LINESECTION} flex flex-col gap-4`}
                >
                    {
                        paymentInfo?.map((b,i) =>
                            <PaymentSection
                                key={i}
                                data={b}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    </main>
}

interface IPaymentSection {
    data: IPaymentInfo
}

const PaymentSection = (props: IPaymentSection) => {
    return <div
        className={`${COLORS.bg.secondary} w-full p-4 rounded-md grid grid-cols-3`}
    >
        <div className="font-bold">Bank name:</div>
        <div className="col-span-2">{props.data.bankName}</div>

        <div className="font-bold">Name</div>
        <div className="col-span-2">{props.data.name}</div> 

        <div className="font-bold">Bank number:</div>
        <div className="col-span-2">{props.data.bankNumber}</div>
    </div>
}