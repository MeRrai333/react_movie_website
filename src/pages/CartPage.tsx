import { useContext, useEffect } from "react";
import { COLORS } from "../constant";
import { ICART } from "../utilize/type";
import { CartContext } from "../App";
import { findPrice } from "../utilize/findPrice";
import { useNavigate } from "react-router-dom";
import { PAYITEMLOCALSTORAGE, PAYLOCALSTORAGE } from "./WaitPayPage";
import PriceSection from "../components/PriceSection";

const imageUrl = "https://image.tmdb.org/t/p/original"

export default function CartPage(){
    const cartContext =useContext(CartContext)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = `${import.meta.env.VITE_WEBNAME} | Cart`
    }, [])

    const isCartHasItem = () =>  cartContext && cartContext.cart && cartContext.cart.length !== 0

    return <main
        className="flex justify-center pt-4 px-6 flex-col w-full lg:w-1/2"
    >
        <div
            className={`${COLORS.bg.primary} w-full p-4 rounded-md flex flex-col gap-2`}
        >
            <div
                className="flex justify-between"
            >
                <h1
                    className="text-xl font-bold"
                >
                    Cart
                </h1>
                <p>
                    Total: {cartContext?.cart?.length}
                </p>
            </div>
            <div
                className="flex flex-col gap-2"
            >
                {
                    !isCartHasItem()
                        ?   <div
                            className="text-center"
                        >
                            no movie
                        </div>
                        : cartContext!.cart!.map((m, i) => 
                            <MovieItem 
                                key={i}
                                data={m}
                            />
                        )
                }
            </div>
            {
                isCartHasItem()
                    // From isCartHasItem() => cartContext.cart always has item
                    ? <PriceSection
                        cart={cartContext!.cart}
                    />
                    : <></>
            }
            <div
                className="flex justify-between"
            >
                <button
                    disabled={!isCartHasItem()}
                    onClick={() => {
                        if(confirm("Are you sure to clear cart"))
                            cartContext?.setCart(undefined)
                    }}
                    className={`${COLORS.border} uppercase font-bold border-1 rounded-md p-2 ${COLORS.bg.remove} hover:brightness-90 duration-200 cursor-pointer`}
                >
                    Clear
                </button>
                <button
                    disabled={!isCartHasItem()}
                    className={`${COLORS.border} uppercase font-bold border-1 rounded-md p-2 ${COLORS.bg.primary} hover:brightness-90 duration-200 cursor-pointer`}
                    onClick={() => {
                        if(!confirm('Confirm order'))
                            return;
                        const temp = localStorage.getItem(PAYLOCALSTORAGE)
                        if(temp){
                            alert("Please wait until late payment was end")
                            return;
                        }
                        localStorage.setItem(PAYITEMLOCALSTORAGE, localStorage.getItem('cart')!)
                        localStorage.setItem(PAYLOCALSTORAGE, (new Date()).toString())
                        localStorage.removeItem('cart')
                        cartContext?.setCart(undefined)
                        window.open('/cart/pay', '_blank')
                        navigate('/')
                    }}
                >Pay</button>
            </div>
        </div>
    </main>
}

interface IMovieItem {
    data: ICART
}

const MovieItem = (props: IMovieItem) => {
    const cartContext = useContext(CartContext)
    const handleRemove = () => {
        if(confirm(`Are you sure to remove "${props.data.title}"`))
            cartContext?.setCart(prev => prev?.filter(m => m.id !== props.data.id))
    }

    return <section
        className={`${COLORS.border} border-1 rounded-md p-2 flex flex-col`}
    >
        <img 
            src={`${imageUrl}${props.data.poster_path}`}
            className="w-full aspect-[2/3]"
        />
        <div
            className="flex justify-between text-lg"
        >
            <p
                className="w-3/4"
            >
                {props.data.title}
            </p>
            <p
                className="w-1/4 text-right"
            >
                ${findPrice(props.data.id).toFixed(2)}
            </p>
        </div>
        <div
            className="flex justify-end"
        >
            <button
                className={`${COLORS.bg.primary} underline font-bold text-red-700 p-1 cursor-pointer hover:brightness-90 duration-200`}
                onClick={handleRemove}
            >Remove</button>
        </div>
    </section>
}