import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './NewClient.scss'
import { ClientModel } from '../../../models/Client.model'
import Input from '../../../components/form/input/Input'
import Button from '../../../components/ui/button/Button'
import { api } from '../../../services/api-request'
import { toast } from 'react-toastify'

const NewClient = () => {
  const navigate = useNavigate()
  const [client, setClient] = useState(ClientModel)

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget

    setClient(client => ({ ...client, [name]: value }))
    if (name === 'email') setClient(client => ({...client, password: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await toast.promise(
      api.post('client/create-client', client),
      {
        pending: 'En attente de réponse...',
        success: 'Client enregisté',
        error: 'Erreur pendant l\'enregistrement',
      }
    )
    navigate('/client')
  }

  return (
    <div className='new-client'>
      <div className="container-top">
        <NavLink to="/client" className="btn btn-text"><i className="ph-duotone ph-arrow-left"></i> Retour</NavLink>
        <h2>Ajout d'un nouveau client</h2>
        <div></div>
      </div>
      <form onSubmit={e => handleSubmit(e)}>
        {/* Nom du client */}
        <Input onChange={handleChange} type="text" label="Nom" name="name" id="name" placeholder="ex: Jean Paul" />
        {/* Phone du client */}
        <Input onChange={handleChange} type="text" label="N° de téléphone" name="phone" id="phone" placeholder="ex: +261340565699" />
        {/* Adresse email du client */}
        <Input onChange={handleChange} type="email" label="Adresse email" name="email" id="email" placeholder="ex: jeanpaul@example.com" />

        <Button type='submit' className='btn-primary btn-text'>Enregistrer</Button>
      </form>
    </div>
  )
}

export default NewClient