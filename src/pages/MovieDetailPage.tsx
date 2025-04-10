import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getByIdMovie } from "../utilize/fetch/movie"
import { ArrowUturnLeftIcon, ShoppingCartIcon } from "@heroicons/react/16/solid"
import { IMOVIE } from "../utilize/type"
import { COLORS } from "../constant"
import { findPrice } from "../utilize/findPrice"

const imageUrl = "https://image.tmdb.org/t/p/original"

export default function MovieDetailPage(){
    const navigate = useNavigate()
    const {id} = useParams()
    const [data, setData] = useState<IMOVIE|undefined>(undefined)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        if(!id)
            navigate('/')
        setPrice(findPrice(Number(id)))
        getByIdMovie(id!)
            .then(json => {
                console.log(json)
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
                    <h1
                        className="text-xl"
                    >{data.title}</h1>
                    <div
                        className="flex flex-col lg:flex-row gap-4"
                    >
                        <div
                            className={`p-2 ${COLORS.bg.primary} mt-4 flex flex-col lg:flex-row gap-2`}
                        >
                            <img 
                                src={`${imageUrl}${data.poster_path}`}
                                className="w-full lg:w-[600px] aspect-[2/3]"
                            />
                            <p className="mt-4 lg:hidden">
                                {data.overview}
                            </p>
                        </div>
                        <div
                            className="lg:mt-4"
                        >
                            <div
                                className={`lg:p-2 ${COLORS.bg.primary} hidden lg:block`}
                            >
                                <p>
                                    {data.overview}
                                </p>
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
                                    Vote averate: {data.vote_average.toLocaleString('en-US', {minimumFractionDigits: 2})}
                                </div>
                                <div
                                    className={`p-2 ${COLORS.bg.primary} w-full`}
                                >
                                    Vote count: {data.vote_count.toLocaleString('en-US', {minimumFractionDigits: 2})}
                                </div>
                            </div>
                            <div
                                className={`flex justify-between gap-2 mt-4 pb-4`}
                            >
                                <div
                                    className={`p-2 ${COLORS.bg.primary} w-2/3 lg:w-1/4`}
                                >
                                    Price: {price.toLocaleString('en-US', {minimumFractionDigits: 2})}
                                </div>
                                <button
                                    className={`p-2 ${COLORS.bg.primary} w-fit hover:brightness-90 duration-200 cursor-pointer`}
                                >
                                    <ShoppingCartIcon className="size-8"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        }
    </main>
}