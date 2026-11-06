import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'

import ProtectRoute from './components/ProtectRoute'
import PublicRoute from './components/PublicRoute'

import Lib_dashbaord from './pages/librarian/Dashbaord'
import Student_dashboard from './pages/student/Dashboard'

import LibrarianLayout from './layout/LibrarianLayout'


import AddCategory from './pages/librarian/AddCategory'
import EditCategory from './pages/librarian/EditCategory'
import AddBook from './pages/librarian/AddBook'
import Book from './pages/librarian/Book'
import StudentLayout from './layout/StudentLayout'
import MyBorrows from './pages/student/Borrow'



const App = () => {

    const router = createBrowserRouter([

        {
            path: "/login",
            element: (
                <PublicRoute>
                    <Login />
                </PublicRoute>
            )
        },

        {
            path: "/register",
            element: (
                <PublicRoute>
                    <Register />
                </PublicRoute>
            )
        },

        // Librarian Routes
        {
            path: "/lib-dashboard",
            element: (
                <ProtectRoute allowedRole={["librarian"]}>
                    <LibrarianLayout />
                </ProtectRoute>
            ),
            children: [
                {
                    index: true,
                    element: <Lib_dashbaord />
                },
                {
                    path: "categories",
                    element: <AddCategory />
                },
                {
                    path: "book",
                    element: <Book />
                },
                {
                    path: "add-book",
                    element: <AddBook />
                },
                {
                    path: "edit-categories/:id",
                    element: <EditCategory />
                },
            ]
        },

        // Student Routes
        {
            path: "/student-dashboard",
            element: (
                <ProtectRoute allowedRole={["student"]}>
                    <StudentLayout />
                </ProtectRoute>
            ),
            children: [
                {
                    index: true,
                    element: <Student_dashboard />
                },
                {
                    path: "my-borrows",
                    element: <MyBorrows />
                },
            ]
        },

    ])

    return <RouterProvider router={router} />
}

export default App