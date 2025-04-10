import { useSearchParams } from "react-router-dom"

interface IPagenation {
    page: number,
    maxPage: number
}

const showRange = 3
const buttonClass = "hover:text-gray-400 duration-200 cursor-pointer p-1"

export default function Pagination(props: IPagenation){
    const [_, setSearchParams] = useSearchParams()

    return <section
        className="flex flew-row gap-1 justify-end"
    >
        {
            props.page-showRange < 1
            ? <></>
            : <>
                <button
                    onClick={() => setSearchParams({ page: "1" })}
                    className={buttonClass}
                >1</button>
                ...
            </>
        }
        {
            [...Array(showRange*2+1)].map((_,i) => {
                const page = props.page-showRange+i
                if(page < 1 || page > props.maxPage)
                    return
                return <button 
                    key={i}
                    disabled={page === props.page}
                    onClick={() => setSearchParams({ page: page.toString() })}
                    className={`${buttonClass} ${page === props.page ? 'text-orange-400' : ''}`}
                >
                    {page}
                </button>
            })
        }
        {
            props.page+showRange > props.maxPage
            ? <></>
            : <>
                ...
                <button
                    onClick={() => setSearchParams({ page: props.maxPage.toString() })}
                    className={buttonClass}
                >{props.maxPage}</button>
            </>
        }
    </section>
}