import { Outlet } from "react-router-dom";
import Nav from "../components/Navbar/Nav";
import Topbar from "../components/topbar/Topbar";
import Foot from "../components/footer/Foot";

const Main = () => {
    return (
        <div>
            <Topbar></Topbar>
            <Nav></Nav>
            <Outlet></Outlet>
            <Foot></Foot>
        </div>
    );
};

export default Main;