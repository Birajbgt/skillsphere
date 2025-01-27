import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = () => {
    // get user information
    const user = JSON.parse(localStorage.getItem('user'))

    // check user
    // check admin=true
    // if true:accessall  the route of admin(Outlet)
    // if false:Nagivate to login

    return user != null && user.role === "Employer" ? <Outlet />
        : <Navigate to={'/login'} />
}

export default AdminRoutes