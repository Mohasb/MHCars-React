//import { Link } from "react-router-dom";
//import { Button } from "../Button/SearchButton/Button";
import ResponsiveAppBar from "../NavBar/NavBar";
import "./Home.scss"

export const Home = () => {
    return (
        <>
        {/* <nav>
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/oficinas"}>Oficinas</Link>
                </li>
                <li>
                    <Link to={"/flota"}>Coches</Link>
                </li>
                <li>
                    <Link to={"/servicios"}>Servicios</Link>
                </li>
                <li>
                    <Link to={"/acceso"}>Acceso</Link>
                </li>
                <li>
                    <Link to={"/admin"}>Admin</Link>
                </li>
            </ul>
        </nav> */}
        <ResponsiveAppBar/>
    <h1>Alquiler de coches</h1>
    {/* <Button/> */}
        </>
    );
}