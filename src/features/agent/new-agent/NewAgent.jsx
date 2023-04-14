import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Checkbox from '../../../components/form/checkbox/Checkbox'
import Input from '../../../components/form/input/Input'
import Button from '../../../components/ui/button/Button'
import { AgentModel } from '../../../models/Agent.model'
import { api } from '../../../services/api-request'
import './NewAgent.scss'

const NewAgent = () => {
    const navigate = useNavigate()
    const [agent, setAgent] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        roles: []
    })

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget

        setAgent(agent => ({ ...agent, [name]: value }))
        if (name === 'email') setAgent(agent => ({ ...agent, password: value }))
    }

    const handleChecked = ({ currentTarget }) => {
        const { name, checked } = currentTarget
        const roleName = name.split('_')[0] + ' ' + name.split('_')[1]

        if (checked) {
            agent.roles.push(roleName)
        } else {
            agent.roles = agent.roles.filter(role => role !== roleName)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await toast.promise(
            api.post('agent/create-agent', agent),
            {
                pending: 'En attente de réponse...',
                success: 'Agent enregisté',
                error: 'Erreur pendant l\'enregistrement',
            }
        )
        navigate('/agent')
    }
    return (
        <div className='new-agent'>
            <div className="container-top">
                <NavLink to="/agent" className="btn btn-text"><i className="ph-duotone ph-arrow-left"></i> Retour</NavLink>
                <h2>Ajout d'un nouveau agent</h2>
                <div></div>
            </div>
            <form onSubmit={e => handleSubmit(e)}>
                {/* Nom de l'agent */}
                <Input onChange={handleChange} type="text" label="Nom" name="name" id="name" placeholder="ex: Jean" />
                {/* Prenom de l'agent */}
                <Input onChange={handleChange} type="text" label="Prenom" name="lastname" id="lastname" placeholder="ex: Paul" />
                {/* Adresse email de l'agent */}
                <Input onChange={handleChange} type="email" label="Adresse email" name="email" id="email" placeholder="ex: jeanpaul@example.com" />
                {/* Roles de l'agent */}
                <span style={{ fontSize: '16px', textAlign: 'left', width: '100%' }}>Roles :</span>
                <div className="input-group">
                    <Checkbox type="checkbox" label="Agent operant" name="agent_operant" id="agent_operant" onChange={handleChecked} />
                    <Checkbox type="checkbox" label="Agent declarant" name="agent_declarant" id="agent_declarant" onChange={handleChecked} />
                    <Checkbox type="checkbox" label="Agent terrain" name="agent_terrain" id="agent_terrain" onChange={handleChecked} />
                    <Checkbox type="checkbox" label="Agent finance" name="agent_finance" id="agent_finance" onChange={handleChecked} />
                </div>

                <Button type='submit' className='btn-primary btn-text'>Enregistrer</Button>
            </form>
        </div>
    )
}

export default NewAgent