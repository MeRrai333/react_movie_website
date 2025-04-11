import { useEffect, useState } from "react"
import { COLORS } from "../constant"

interface IPopupText {
    text: string,
    fadeDuration: number
}

export default function PopupText(props: IPopupText){
    const [fade, setFade] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setFade(true), props.fadeDuration);
        return () => clearTimeout(timer);
    }, []);

    return <div
        className="fixed bottom-5 flex justify-center w-full left-0"
    >
        <div
            className={`${COLORS.bg.secondary} w-fit text-2xl rounded-md text-center py-2 px-4 shadow-xl duration-1000 ${fade ? 'opacity-0' : 'opacity-100'}`}
        >
            {props.text}
        </div>
    </div>
}