import { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import './Login.scss'
import logo from '../../assets/logo.png'
import { api } from '../../services/api-request'
import Input from '../../components/form/input/Input'
import Button from '../../components/ui/button/Button'
import Select from '../../components/form/select/Select'

const Login = () => {
    const { token, login } = useContext(AuthContext)
    const { user, setUser } = useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    const [roles, setRoles] = useState(null)
    const [selectedRole, setSelectedRole] = useState(null)

    const handleLogin = async (e) => {
        e.preventDefault()

        const response = await api.post('login', credentials)

        // await setUser({ ...user, _id: response.agent_id, name: response.agent_name })
        user._id = response.agent_id || response.client_id
        user.name = response.agent_name || response.client_name
        setRoles(response.roles)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let credentials = { role: selectedRole }
        
        if (credentials.role === 'client') {
            credentials.client_id = user._id
        } else {
            credentials.agent_id = user._id
        }
        api.post('selectRole', credentials)
            .then(response => {
                user.role = response.tokenize.role
                return response
            })
            .then((response) => login(response.tokenize))
    }

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget

        setCredentials(credentials => ({ ...credentials, [name]: value }))
    }

    return token
        ? <Navigate to="/" />
        : (
            <div className="wrapper">
                <div className="login">
                    <img src={logo} alt="logo" />
                    {
                        !roles
                            ? (
                                <form onSubmit={e => handleLogin(e)}>
                                    <h1>Connexion</h1>
                                    {/* input email */}
                                    <Input type="email" name='email' id='email' placeholder='example@email.com' onChange={handleChange} label="Adresse email" autoComplete="off" />

                                    {/* input password */}
                                    <Input type="password" name='password' id='password' placeholder='*********' onChange={handleChange} label="Mot de passe" />
                                    <Button type='submit' className='btn-primary btn-text'>Continuer</Button>
                                </form>
                            )
                            : (
                                <form onSubmit={e => handleSubmit(e)}>
                                    <h1>Choix de rôle</h1>
                                    {/* select role */}
                                    <label htmlFor="roles"></label>
                                    <Select name="roles" id="roles" onChange={e => setSelectedRole(e.target.value)} label="Choisir un role">
                                        {
                                            roles.map((role, index) => <option value={role} key={index}>{role}</option>)
                                        }
                                    </Select>

                                    <Button type='submit' className='btn-primary btn-text'>Se connecter</Button>
                                </form>
                            )
                    }
                </div>
            </div>
        )
}

export default Login