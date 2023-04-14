import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(() => {
        if (localStorage.getItem('user')) {
            let localUser = JSON.parse(localStorage.getItem('user'))
            return localUser
        }
        return {
            _id: '',
            name: '',
            role: ''
        }
    })
    const [token, setToken] = useState(() => {
        if (localStorage.getItem('token')) {
            let localToken = JSON.parse(localStorage.getItem('token'))
            return localToken
        }
        return null
    })

    const login = (tokenize) => {
        localStorage.setItem('token', JSON.stringify(tokenize.token))
        localStorage.setItem('user', JSON.stringify(user))

        setToken(JSON.stringify(tokenize.token))
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext