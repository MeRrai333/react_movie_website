import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { COLORS } from "../constant";

export default function Layout(){
    return <main
        className={`${COLORS.bg.tertiary} min-h-screen h-fit w-screen text-white`}
    >
        <NavBar />
        <section
            className="w-full flex justify-center"
        >
            <div className="w-full lg:w-3/4 flex justify-center">
                <Outlet />
            </div>
        </section>
    </main>
}