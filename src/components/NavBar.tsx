import { ShoppingCartIcon } from "@heroicons/react/16/solid"
import { Link } from "react-router-dom"
import { COLORS } from "../constant"

const navList = [
    {
        title: "Home",
        to: "/"
    },
    {
        title: <ShoppingCartIcon className="size-8"/>,
        to: "/cart"
    }
]

export default function NavBar(){
    return <nav
        className={`${COLORS.bg.primary} p-3 flex flex-row justify-between items-center`}
    >
        {
            navList.map((n, i) => 
                <Link
                    className={`uppercase bg-inherit p-1 font-bold hover:brightness-90 duration-200`}
                    key={i}
                    to={n.to}
                >
                    {n.title}
                </Link>
            )
        }
    </nav>
}