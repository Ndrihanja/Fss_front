import { Outlet, Navigate } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import MainLayout from "../layouts/mainLayout/MainLayout"

const PrivateRoutes = () => {
    const { token } = useContext(AuthContext)
    return (
        token
            ? <MainLayout><Outlet/></MainLayout>
            : <Navigate to="/login" />
    )
}

export default PrivateRoutes