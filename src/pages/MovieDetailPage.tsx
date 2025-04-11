import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getByIdMovie } from "../utilize/fetch/movie"
import { ArrowUturnLeftIcon, ShoppingCartIcon } from "@heroicons/react/16/solid"
import { IMOVIE } from "../utilize/type"
import { COLORS } from "../constant"
import { findPrice } from "../utilize/findPrice"
import { CartContext } from "../App"
import PopupText from "../components/PopupText"

const imageUrl = "https://image.tmdb.org/t/p/original"

const fadeDuration = 3000

export default function MovieDetailPage(){
    const navigate = useNavigate()
    const {id} = useParams()
    const [data, setData] = useState<IMOVIE|undefined>(undefined)
    const [price, setPrice] = useState(0)
    const cartContext = useContext(CartContext)
    const [isPopUp, setIsPopUp] = useState(0)

    useEffect(() => {
        if(!id)
            navigate('/')
        document.title = `${import.meta.env.VITE_WEBNAME} | Movie`
        setPrice(findPrice(Number(id)))
        getByIdMovie(id!)
            .then(json => {
                document.title = `${import.meta.env.VITE_WEBNAME} | ${json.title}`
                setData(json)
            })
            .catch(err => {
                console.error(err)
                alert("Some error")
                navigate('/')
            })
    }, [])

    const handlePopup = (val: number) => {
        setIsPopUp(val)
        setTimeout(() => setIsPopUp(0), fadeDuration+1000)
    }

    return <main
        className="w-fit flex justify-center py-4 px-6 flex-col"
    >
        <button
            className="hover:text-gray-400 cursor-pointer w-fit"
            onClick={() => navigate('../')}
        >
            <ArrowUturnLeftIcon className="size-8"/>
        </button>
        {
            !data
                ? <>Loading...</>
                : <div className="mt-2">
                    <h1
                        className="text-xl"
                    >{data.title}</h1>
                    <div
                        className="flex flex-col md:flex-row gap-4"
                    >
                        <div
                            className={`p-2 ${COLORS.bg.primary} mt-4 flex flex-col md:flex-row gap-2`}
                        >
                            <img 
                                src={
                                    data.poster_path
                                        ? `${imageUrl}${data.poster_path}`
                                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO5kCepNdhZvDKJtmPAIWnloSdTal7N1CQaA&s'
                                }
                                className="w-full md:w-[500px] lg:w-[600px] aspect-[2/3]"
                            />
                            <p className="mt-4 md:hidden">
                                {data.overview}
                            </p>
                        </div>
                        <div
                            className="md:mt-4 md:w-1/2"
                        >
                            <div
                                className={`md:p-2 ${COLORS.bg.primary} hidden md:block`}
                            >
                                <p>
                                    {data.overview}
                                </p>
                            </div>
                            <div
                                className="w-full md:mt-2"
                            >
                                <div
                                    className={`p-2 rounded-md ${COLORS.bg.language} w-fit uppercase font-bold`}
                                >
                                    {data.original_language}
                                </div>
                            </div>
                            <div
                                className="w-full flex gap-1 flex-wrap mt-4"
                            >
                                {
                                    data.genres?.map((g,i) => 
                                        <span
                                            className={`${COLORS.bg.secondary} p-1 uppercase rounded-md`}
                                            key={i}
                                        >{
                                            g.name
                                        }</span>
                                    )
                                }
                            </div>
                            <div
                                className={`flex gap-2 mt-4`}
                            >
                                <div
                                    className={`p-2 ${COLORS.bg.primary} w-full`}
                                >
                                    Vote averate: {data.vote_average.toFixed(2)}
                                </div>
                                <div
                                    className={`p-2 ${COLORS.bg.primary} w-full`}
                                >
                                    Vote count: {data.vote_count}
                                </div>
                            </div>
                            <div
                                className={`flex justify-between gap-2 mt-4 pb-4`}
                            >
                                <div
                                    className={`p-2 ${COLORS.bg.primary} flex items-center justify-between w-1/3 min-w-fit md:w-1/4`}
                                >
                                    Price: 
                                    <span>
                                        {price.toFixed(2)}
                                    </span>
                                </div>
                                <button
                                    className={`p-2 ${COLORS.bg.primary} w-fit hover:brightness-90 duration-200 cursor-pointer`}
                                    onClick={() => {
                                        if(cartContext)
                                            cartContext.setCart(prev => {
                                                const temp = {
                                                    id: data.id,
                                                    title: data.title,
                                                    poster_path: data.poster_path,
                                                    price: price
                                                }
                                                if(prev){
                                                    if(prev.find(c => c.id === data.id)){
                                                        handlePopup(2)
                                                        return prev
                                                    }
                                                    else{
                                                        handlePopup(1)
                                                        return [
                                                            ...prev,
                                                            temp
                                                        ]
                                                    }
                                                }
                                                handlePopup(1)
                                                return [temp]
                                            })
                                    }}
                                >
                                    <ShoppingCartIcon className="size-8"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    {
                        isPopUp
                            ? <PopupText
                                text={
                                    isPopUp === 1
                                    ? `Added "${data.title}" to cart`
                                    : 'This film was in cart!'
                                }
                                fadeDuration={fadeDuration}
                            />
                            : <></>
                    }
                </div>
        }
    </main>
}