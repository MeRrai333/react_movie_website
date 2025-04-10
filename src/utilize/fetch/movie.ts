const apiKey = import.meta.env.VITE_APIKEY;
const apiUrl = 'https://api.themoviedb.org/3'

export const getSearchMovie = async (
    search: string,
    page: number
) => {
    const res = await fetch(
        `${apiUrl}/search/movie?api_key=${apiKey}&query=${search}&page=${page}`
    )
    if(!res.ok){
        console.error((await res.json()).message)
        throw new Error('Error search api')
    }
    return await res.json()
}

export const getByIdMovie = async (
    id: string
) => {
    const res = await fetch(
        `${apiUrl}/movie/${id}?api_key=${apiKey}`
    )
    if(!res.ok){
        console.error((await res.json()).message)
        throw new Error('Error search api')
    }
    return await res.json()
}

export const getGenreList = async () => {
    const res = await fetch(
        `${apiUrl}/genre/movie/list?api_key=${apiKey}`
    )
    if(!res.ok){
        console.error((await res.json()).message)
        throw new Error('Error search api')
    }
    return await res.json()
}