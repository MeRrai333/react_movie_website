import { useEffect, useState } from "react"
import { COLORS } from "../constant"
import { getSearchMovie } from "../utilize/fetch/movie"
import { IMOVIE } from "../utilize/type"
import Pagination from "../components/Pagination"
import { useSearchParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"

export default function HomePage(){
    const [search, setSearch] = useState("")
    const [movies, setMovies] = useState<IMOVIE[]|undefined>(undefined)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [searchParams, _] = useSearchParams()

    useEffect(() => {
        if(!search)
            return

        const deleyFetch = setTimeout(() => {
            getSearchMovie(search, page)
                .then(json => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                    setMaxPage(json.total_pages)
                    setTotal(json.total_results)
                    setMovies(json.results)
                })
                .catch(console.error)
        }, 750)

        return () => clearTimeout(deleyFetch)
    }, [search, page])

    useEffect(() => {
        setPage(Number(searchParams.get("page")))
    }, [searchParams])

    return <main
        className="w-full flex justify-center pt-4 px-6 flex-col"
    >
        <h1
            className="w-full text-left text-2xl font-bold py-4"
        >
            Search
        </h1>
        <input
            className={`${COLORS.bg.secondary} w-full p-2 rounded-2xl`}
            placeholder="Search for movie"
            type="text"
            value={search}
            onChange={(e) => {
                setPage(1)
                setMaxPage(1)
                setSearch(e.target.value)
            }}
        />
        {
            !movies
            ? <></>
            : <>
                <div>
                    Founded: {total} result
                </div>
                {
                    movies.length === 0
                        ? <span>Not found</span>
                        : <div className="flex flex-wrap gap-4 justify-center">
                            {
                                movies.map((m, i) => 
                                    <MovieCard
                                        key={i} 
                                        data={m}
                                    />
                                )
                            }
                        </div>
                }
                <Pagination 
                    page={page}
                    maxPage={maxPage}
                />
            </>
        }
    </main>
}