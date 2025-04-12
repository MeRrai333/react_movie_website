import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Layout from "./pages/Layout"
import MovieDetailPage from "./pages/MovieDetailPage"
import { createContext, useEffect, useState } from "react"
import { ICART, IGERN } from "./utilize/type"
import { getGenreList } from "./utilize/fetch/movie"
import CartPage from "./pages/CartPage"
import MovieEditPricePage from "./pages/MovieEditPricePage"
import WaitPayPage from "./pages/WaitPayPage"
import { autoRemovePaymentLocalStorage } from "./utilize/removePayLocalStorage"

export const GenreListContext = createContext<IGERN[]|undefined>(undefined)
export const CartContext = createContext<{
  cart: ICART[]|undefined,
  setCart: React.Dispatch<React.SetStateAction<ICART[] | undefined>>
}|undefined>(undefined)

function App() {
  const [genres, setGenres] = useState<IGERN[]|undefined>(undefined)
  const [cart, setCart] = useState<ICART[]|undefined>(undefined);

  useEffect(() => {
    const localCart = localStorage.getItem('cart')
    if(localCart && localCart !== "undefined")
      setCart(
        JSON.parse(localCart)
      )
    getGenreList()
      .then(json => setGenres(json.genres))
      .catch(console.error)
    autoRemovePaymentLocalStorage()
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <CartContext.Provider value={{cart, setCart}}>
      <GenreListContext.Provider value={genres}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              <Route path="/movie/:id/edit" element={<MovieEditPricePage />} />
              <Route path="/cart" element={<CartPage />} />
            </Route>
            <Route path="/cart/pay" element={<WaitPayPage />} />
          </Routes>
        </BrowserRouter>
      </GenreListContext.Provider>
    </CartContext.Provider>
  )
}

export default App
