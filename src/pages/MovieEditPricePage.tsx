import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getByIdMovie } from "../utilize/fetch/movie"
import { ArrowUturnLeftIcon, PencilSquareIcon } from "@heroicons/react/16/solid"
import { IMOVIE } from "../utilize/type"
import { COLORS } from "../constant"
import { findPrice, getAllAdjustPrice, setAllAdjustPrice } from "../utilize/findPrice" 

const imageUrl = "https://image.tmdb.org/t/p/original"

export default function MovieEditPricePage(){
    const navigate = useNavigate()
    const {id} = useParams()
    const [data, setData] = useState<IMOVIE|undefined>(undefined)
    const [price, setPrice] = useState(findPrice(Number(id)))

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
            .catch(console.error)
    }, [])

    return <main
        className="w-fit flex justify-center pt-4 px-6 flex-col"
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
                    <div
                        className="flex justify-between"
                    >
                        <h1
                            className="text-xl"
                        >{data.title}</h1>
                        <h1
                            className="text-xl"
                        >Adjust price</h1>
                    </div>
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
                                    className={`p-2 ${COLORS.bg.primary} flex justify-start items-center min-w-fit w-1/3 md:w-2/4`}
                                >
                                    Price: 
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => {
                                            const val = e.target.value
                                            if (/^\d*\.?\d{0,2}$/.test(val) || val === ''){
                                                const temp = parseFloat(val)
                                                if(temp > 0)
                                                    setPrice(temp)
                                            }
                                        }}
                                        className=" w-full text-right border-1 bg-white text-black"
                                    />
                                </div>
                                <button
                                    className={`p-2 ${COLORS.bg.primary} w-fit hover:brightness-90 duration-200 cursor-pointer`}
                                    onClick={() => {
                                        const newPrice = {
                                            id: data.id,
                                            price: price
                                        }
                                        const priceList = getAllAdjustPrice()
                                        if(priceList){
                                            setAllAdjustPrice([
                                                ...priceList,
                                                newPrice
                                            ])
                                        }
                                        else{
                                            setAllAdjustPrice([newPrice])
                                        }
                                        if(findPrice(data.id) === price)
                                            alert('Saved change!')
                                    }}
                                >
                                    <PencilSquareIcon className="size-8"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        }
    </main>
}