import { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Loader from '../../components/ui/loader/Loader'
import AuthContext from '../../context/AuthContext'
import { api } from '../../services/api-request'
import './Dossier.scss'

const Dossier = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [liste, setListe] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = (e, slug) => {
        e.preventDefault()

        navigate(`${slug}`)
    }

    const fetchDossiers = async () => {
        setIsLoading(true)
        api.get(`dossier/all/${user._id}`, { params: { id: user._id } })
        .then(response => {
            setListe(response)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        fetchDossiers()
    }, [])

    if (isLoading) return (
        <div className="loader-container">
            <Loader />
        </div>
    )

    return (
        <div className='dossier'>
            <div className="container-top">
                <h2>Liste des dossiers</h2>
                {
                    user.role === 'superviseur' && (
                        <NavLink className="btn btn-tertiary btn-text" to="nouveau">
                            <i className="ph-duotone ph-plus-circle"></i>
                            <span>Créer un dossier</span>
                        </NavLink>
                    )
                }
            </div>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Produit</th>
                            <th>Origine</th>
                            <th>Destination</th>
                            <th>Client</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            liste && liste.map((dossier, index) =>
                                <tr key={index} onClick={e => handleClick(e, dossier._id)}>
                                    <td>{dossier.name}</td>
                                    <td>{dossier.produit}</td>
                                    <td>{dossier.origin}</td>
                                    <td>{dossier.destination}</td>
                                    <td>{dossier.client_name}</td>
                                    <td className='finalisation'>
                                        {
                                            dossier.etape < 5
                                                ? (<i className="ph-duotone ph-minus-circle" style={{ color: 'red' }}></i>)
                                                : (<i className="ph-duotone ph-check-circle" style={{ color: 'green' }}></i>)
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dossier