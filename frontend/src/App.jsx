import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectRoute from './components/ProtectRoute'
import Lib_dashbaord from './pages/librarian/Dashbaord'

import Student_dashboard from './pages/student/Dashboard'
import PublicRoute from './components/PublicRoute'
import LibrarianLayout from './layout/LibrarianLayout'
import AddCategory from './pages/librarian/AddCategory'


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <>
          <PublicRoute>
            <Login />
          </PublicRoute>
        </>
      )
    },
    {
      path: "/register",
      element: (
        <>
          <PublicRoute>
            <Register />
          </PublicRoute>
        </>
      )
    },

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
         path:"categories",
          element: <AddCategory/>
        },
      ]
    },
    {
      path: "/student-dashboard",
      element: (
        <ProtectRoute allowedRole={["student", "librarian"]}>
          <Student_dashboard />
        </ProtectRoute>
      )
    },

  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App