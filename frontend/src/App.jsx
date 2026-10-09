import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectRoute from './components/ProtectRoute'
import Lib_dashbaord from './pages/librarian/Dashbaord'
import Pending from './pages/Pending'
import Student_dashboard from './pages/student/Dashboard'


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/pending",
      element: <Pending />
    },
    {
      path: "/lib-dashboard",
      element: (
        <ProtectRoute allowedRole={["librarian"]}>
          <Lib_dashbaord />
        </ProtectRoute>
      )
    },
    {
      path: "/student-dashboard",
      element: (
        <ProtectRoute allowedRole={["student","librarian"]}>
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