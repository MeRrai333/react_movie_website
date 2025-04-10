import { useNavigate } from "react-router-dom"
import { COLORS } from "../constant"
import { IMOVIE } from "../utilize/type"
import { useContext } from "react"
import { GenreListContext } from "../App"

interface IMovieCard {
    data: IMOVIE
}

const imageUrl = "https://image.tmdb.org/t/p/w300"

export default function MovieCard(props: IMovieCard){
    const genres = useContext(GenreListContext)
    const navigate = useNavigate()

    return <div
        className={`${COLORS.bg.primary} w-full md:w-1/4 lg:w-1/6 p-2 flex flex-col items-center hover:brightness-90 cursor-pointer`}
        onClick={() => navigate(`/movie/${props.data.id}`)}
    >   
        <img 
            src={`${imageUrl}${props.data.poster_path}`}
            className="w-full aspect-[2/3]"
        />
        <div className="flex w-full justify-between my-2">
            <span
                className="text-left text-lg w-5/6"
            >
                {props.data.title}
            </span>
            <div
                className="rounded-md bg-blue-500 size-8 uppercase flex justify-center items-center"
            >
                {props.data.original_language}
            </div>
        </div>
        <div
            className="w-full flex justify-end gap-1 flex-wrap"
        >
            {
                props.data.genre_ids.map((gId,i) => 
                    <span
                        className={`${COLORS.bg.secondary} p-1 uppercase rounded-md`}
                        key={i}
                    >{
                        genres!.find(g => g.id === gId)?.name
                    }</span>
                )
            }
        </div>
    </div>
}