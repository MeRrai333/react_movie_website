import { ShoppingCartIcon } from "@heroicons/react/16/solid"
import { Link } from "react-router-dom"
import { COLORS } from "../constant"
import { useContext } from "react"
import { CartContext } from "../App"

const navList = [
    {
        title: "Home",
        to: "/"
    }
]

const LINKCLASS = "uppercase bg-inherit p-1 font-bold hover:brightness-90 duration-200"

export default function NavBar(){
    const cartContext = useContext(CartContext)

    return <nav
        className={`${COLORS.bg.primary} p-3 flex flex-row justify-between items-center`}
    >
        {
            navList.map((n, i) => 
                <Link
                    className={LINKCLASS}
                    key={i}
                    to={n.to}
                >
                    {n.title}
                </Link>
            )
        }
        <Link
            className={`${LINKCLASS} flex flex-row gap-2 justify-center items-center`}
            to={'/cart'}
        >
            {
                cartContext && cartContext.cart
                    ?   cartContext.cart.length !== 0
                        ? <span>
                            {cartContext.cart.length}
                        </span>
                        : <></>
                    : <></>
            }
            <ShoppingCartIcon className="size-8"/>
        </Link>
    </nav>
}