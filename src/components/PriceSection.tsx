import { useEffect, useState } from "react"
import { findPrice } from "../utilize/findPrice"
import { ICART } from "../utilize/type"

interface IPriceSection {
    cart: ICART[]|undefined
}

const SUMLISTCLASS = "border-white border-b-1 flex justify-between"

export default function PriceSection(props: IPriceSection){
    const [sum, setSum] = useState<number>(
        props.cart!.reduce((sum, m) => sum+findPrice(m.id), 0)
    )

    useEffect(() => {
        setSum(
            props.cart!.reduce((sum, m) => sum+findPrice(m.id), 0)
        )
    }, [props.cart])

    const isDiscount = () => {
        /*
            From question
                เมื่อซื้อหนังมากกว่า 3 รายการลด 10% => 4 เรื่อง
                มากกว่า 5 รายการลด 20% => 6 เรื่อง
        */
        // <= 3 --> ไม่ลด
        if(props.cart!.length <= 3)
            return <></>
        // > 5 (6 ตั้งแต่เรื่องขึ้นไป) --> ลด 20%
        // else -> มากกว่า 3 แน่นอน --> ลด 10%
        const discount = sum * (
            props.cart!.length > 5
                ? 0.2       // 20%
                : 0.1       // 10% 
        )
        return <div
            className={`${SUMLISTCLASS} text-red-600`}
        >
            <span
                className="font-bold"
            >
                {
                    props.cart!.length > 5
                        ? `More than 5 discount 20%`
                        : `More than 3 discount 10%`
                }
            </span>
            <span>
                $-{discount}
            </span>
        </div>
    }

    return <div>
        {
            props.cart!.map((c, i) => 
                <div
                    key={i}
                    className={SUMLISTCLASS}
                >
                    <span>
                        {c.title}
                    </span>
                    <span>
                        ${findPrice(c.id).toFixed(2)}
                    </span>
                </div>
            )
        }
        {
            isDiscount()
        }
        <div
            className={SUMLISTCLASS}
        >
            <span
                className="font-bold"
            >
                Summarize
            </span>
            <span>
                ${
                    (
                        sum * (
                            props.cart!.length > 5
                                ? 0.8
                                : props.cart!.length > 3
                                    ? 0.9
                                    : 1
                        )
                    ).toFixed(2)
                }
            </span>
        </div>
    </div>
}