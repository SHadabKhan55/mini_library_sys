import { NavLink } from "react-router-dom";

function LibrarianNavbar() {

    const navOptions = [
        {
            id: 1,
            title: "Dashboard",
            path: "/lib-dashboard"
        },
        {
            id: 2,
            title: "Add Category",
            path: "/lib-dashboard/categories"
        },
        {
            id: 3,
            title: "Manage Students",
            path: "/lib-dashboard/students"
        }
    ];

    return (
        <nav>
            {navOptions.map((option) => (
                <span key={option.id}>
                    <NavLink to={option.path}>
                        {option.title}
                    </NavLink>
                    {" | "}
                </span>
            ))}
        </nav>
    );
}

export default LibrarianNavbar;