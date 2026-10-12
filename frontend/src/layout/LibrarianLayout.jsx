import { Outlet } from "react-router-dom";
import LibrarianNavbar from "../components/LibrarianNavbar";

function LibrarianLayout() {
    return (
        <>
            <LibrarianNavbar />
            <Outlet />
        </>
    );
}

export default LibrarianLayout;