import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/ui/loader/Loader'
import AuthContext from '../../context/AuthContext'
import { api } from '../../services/api-request'
import './Client.scss'

const Client = () => {
    const [liste, setListe] = useState()
    const { user } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        api.get('client')
            .then(response => {
                setListe(response.clients)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) return (
        <div className="loader-container">
            <Loader />
        </div>
    )

    return (
        <div className='client'>
            <div className="container-top">
                <h2>Liste des clients</h2>
                {
                    user.role === 'superviseur' && (
                        <NavLink className="btn btn-tertiary btn-text" to="nouveau">
                            <i className="ph-duotone ph-plus-circle"></i>
                            <span>Ajouter un client</span>
                        </NavLink>
                    )
                }
            </div>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>Nom du client</th>
                            <th>N° de téléphone</th>
                            <th>Adresse email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            liste && liste.map(client =>
                                <tr key={client._id}>
                                    <td>{client.name}</td>
                                    <td>{client.phone}</td>
                                    <td>{client.email}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Client