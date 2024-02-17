import { Outlet } from "react-router-dom"
import Header from "../components/Header"

export default function Layout() {
    return (
        <>
            <Header />
            <main className="max-w-screen-2xl mx-auto">                
                <Outlet />
            </main>
        </>
    )
}