export interface IMOVIE {
    id: number,
    title: string,
    poster_path: string,
    original_language: string,
    vote_average: number,
    vote_count: number,
    genre_ids: number[],
    genres?: IGERN[]
    release_date: string,
    overview: string
}

export interface IGERN {
    id: number,
    name: string
}