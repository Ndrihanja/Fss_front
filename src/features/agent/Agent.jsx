import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/ui/loader/Loader'
import AuthContext from '../../context/AuthContext'
import { api } from '../../services/api-request'
import './Agent.scss'

const Agent = () => {
  const [liste, setListe] = useState()
  const { user } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    api.get('agent')
      .then(response => {
        setListe(response.agents)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return (
    <div className="loader-container">
      <Loader />
    </div>
  )

  return (
    <div className='agent'>
      <div className="container-top">
        <h2>Liste des agents</h2>
        {
          user.role === 'superviseur' && (
            <NavLink className="btn btn-tertiary btn-text" to="nouveau">
              <i className="ph-duotone ph-plus-circle"></i>
              <span>Ajouter un agent</span>
            </NavLink>
          )
        }
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Adresse email</th>
              <th>Roles</th>
            </tr>
          </thead>
          <tbody>
            {
              liste && liste.map(agent =>
                <tr key={agent._id}>
                  <td>{agent.name}</td>
                  <td>{agent.lastname}</td>
                  <td>{agent.email}</td>
                  <td>{agent.roles.join(', ')}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Agent