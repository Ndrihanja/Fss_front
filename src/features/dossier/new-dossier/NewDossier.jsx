import { useContext, useEffect, useState } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import Input from '../../../components/form/input/Input'
import Select from '../../../components/form/select/Select'
import Button from '../../../components/ui/button/Button'
import { NewDossierModel } from '../../../models/Dossier.model'
import { toast } from 'react-toastify'
import './NewDossier.scss'
import AuthContext from '../../../context/AuthContext'
import { api } from '../../../services/api-request'

const NewDossier = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [dossier, setDossier] = useState({ ...NewDossierModel, superviseur: user._id, superviseur_name: user.name })
    const [clients, setClients] = useState()
    const [agents, setAgents] = useState()

    const handleChange = ({ currentTarget }) => {
        const { name, value, nodeName } = currentTarget
        const node = nodeName.toLowerCase()
        const targetWithName = name + '_name'

        if (node === 'select') {
            const values = value.split(' ')
            setDossier(prevDossier => ({ ...prevDossier, [name]: values[0], [targetWithName]: values[1] }))
        } else {
            setDossier(prevDossier => ({ ...prevDossier, [name]: value }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await toast.promise(
            api.post('dossier/create-dossier', dossier),
            {
                pending: 'En attente de réponse...',
                success: 'Dossier enregisté',
                error: 'Erreur pendant l\'enregistrement',
            }
        )
        navigate('/dossier')
        // console.log(dossier)
    }

    useEffect(() => {
        const fetchClients = async () => {
            const response = await api.get('client')
            setClients(response.clients)
        }
        const fetchAgents = async () => {
            const response = await api.get('agent')
            setAgents(response.agents)
        }

        fetchClients()
        fetchAgents()
    }, [])

    if (user.role !== 'superviseur') return <Navigate to='/dossier' />

    return (
        <div className='new-dossier'>
            <div className="container-top">
                <NavLink to="/dossier" className="btn btn-text"><i className="ph-duotone ph-arrow-left"></i> Retour</NavLink>
                <h2>Création d'un nouveau dossier</h2>
                <div></div>
            </div>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="input-group">
                    {/* Nom du dossier */}
                    <Input onChange={handleChange} type="text" label="Nom du dossier" name="name" id="name" placeholder="ex: Mon dossier" />
                    {/* Nom du produit */}
                    <Input onChange={handleChange} type="text" label="Nom du produit" name="produit" id="produit" placeholder="ex: Mon produit" />
                </div>
                <div className="input-group">
                    {/* Origine */}
                    <Input onChange={handleChange} type="text" label="Origine" name="origin" id="origin" placeholder="ex: France" />
                    {/* Destination */}
                    <Input onChange={handleChange} type="text" label="Destination" name="destination" id="destination" placeholder="ex: Madagascar" />
                </div>
                <div className="input-group">
                    {/* Superviseur */}
                    <Input type="text" value={user.name} label="Superviseur" disabled />
                    {/* Client */}
                    <Select onChange={handleChange} label="Client" name="client" id="client" placeholder="Choisir un client...">
                        {
                            clients && clients.map((client, index) => <option value={client._id + ' ' + client.name} key={index}>{client.name}</option>)
                        }
                    </Select>
                </div>
                <div className="input-group">
                    {/* Agent Opérant */}
                    <Select onChange={handleChange} label="Agent Opérant" name="agent_operant" id="Operant">
                        {
                            agents && agents.filter(agent => agent.roles.includes('agent operant')).map((agent, index) => <option value={agent._id + ' ' + agent.name} key={index}>{agent.name}</option>)
                        }
                    </Select>
                    {/* Agent Déclarant */}
                    <Select onChange={handleChange} label="Agent Déclarant" name="agent_declarant" id="declarant">
                        {
                            agents && agents.filter(agent => agent.roles.includes('agent declarant')).map((agent, index) => <option value={agent._id + ' ' + agent.name} key={index}>{agent.name}</option>)
                        }
                    </Select>
                    {/* Agent Terrain */}
                    <Select onChange={handleChange} label="Agent Terrain" name="agent_terrain" id="terrain">
                        {
                            agents && agents.filter(agent => agent.roles.includes('agent terrain')).map((agent, index) => <option value={agent._id + ' ' + agent.name} key={index}>{agent.name}</option>)
                        }
                    </Select>
                    {/* Agent Finance */}
                    <Select onChange={handleChange} label="Agent Finance" name="agent_finance" id="finance">
                        {
                            agents && agents.filter(agent => agent.roles.includes('agent finance')).map((agent, index) => <option value={agent._id + ' ' + agent.name} key={index}>{agent.name}</option>)
                        }
                    </Select>
                </div>

                <Button type='submit' className='btn-primary btn-text'>Enregistrer</Button>
            </form>

        </div>
    )
}

export default NewDossier