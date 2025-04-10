import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Layout from "./pages/Layout"
import MovieDetailPage from "./pages/MovieDetailPage"
import { createContext, useEffect, useState } from "react"
import { IGERN } from "./utilize/type"
import { getGenreList } from "./utilize/fetch/movie"

export const GenreListContext = createContext<IGERN[]|undefined>(undefined)

function App() {
  const [genres, setGenres] = useState<IGERN[]|undefined>(undefined)

  useEffect(() => {
    getGenreList()
      .then(json => setGenres(json.genres))
      .catch(console.error)
  }, [])

  return (
    <GenreListContext.Provider value={genres}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GenreListContext.Provider>
  )
}

export default App
