import { Outlet } from "react-router-dom"
import HeaderComponent from "../components/header/header"
import FooterComponent from "../components/footer/footer"

const MainLayout = () => {
    return (
        <div>
            <header>
                <HeaderComponent />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <FooterComponent />
            </footer>
        </div>
    )
}

export default MainLayout