import { Link } from "react-router-dom";

export const Home = (prop: {text:string}) => {
    return (
        <>
        <nav>
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
        </nav>
    <h1>{prop.text}</h1>
        </>
    );
}