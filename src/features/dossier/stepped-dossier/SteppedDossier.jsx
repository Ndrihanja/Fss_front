import { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import './SteppedDossier.scss'
import { SteppedDossierModel } from '../../../models/Dossier.model'
import Input from '../../../components/form/input/Input'
import Button from '../../../components/ui/button/Button'
import Divider from '../../../components/ui/divider/Divider'
import AuthContext from '../../../context/AuthContext'
import { api } from '../../../services/api-request'
import { toast } from 'react-toastify'
import Loader from '../../../components/ui/loader/Loader'

const agent_role = [
    'superviseur',
    'agent operant',
    'agent declarant',
    'agent terrain',
    'agent finance',
]

const testClient = [
    'Rakoto',
    'Razafy',
]
// 

const SteppedDossier = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [dossier, setDossier] = useState(SteppedDossierModel)
    const [upDossier, setUpDossier] = useState({
        ...SteppedDossierModel,
        facturation: SteppedDossierModel.prix_traitement.$numberDecimal + SteppedDossierModel.taxe.$numberDecimal
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget

        setUpDossier(upDossier => ({ ...upDossier, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await toast.promise(
            api.post(`dossier/update-dossier/${upDossier._id}`, upDossier),
            {
                pending: 'En attente de réponse...',
                success: 'Dossier enregisté',
                error: 'Erreur pendant l\'enregistrement',
            }
        )
        navigate('/dossier')
    }

    const handleTaxe = e => {
        setUpDossier({
            ...upDossier,
            taxe: e.target.value,
            facturation: (parseFloat(upDossier.prix_traitement.$numberDecimal) + parseFloat(e.target.value))
        })
    }

    const handlePrix = e => {
        setUpDossier({
            ...upDossier,
            prix_traitement: e.target.value,
            facturation: (parseFloat(upDossier.taxe.$numberDecimal) + parseFloat(e.target.value))
        })
    }

    const isDisabled = (type, fieldName, agent) => {
        if(type === 'decimal') return user.role !== agent_role[agent] || dossier[fieldName].$numberDecimal != 0
        return user.role !== agent_role[agent] || dossier[fieldName]
    }
    const fetchDossier = () => {
        api.get(`dossier/${slug}`)
            .then(response => {
                setDossier(response.dossier)
                setUpDossier(response.dossier)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        setIsLoading(true)
        fetchDossier()
    }, [])

    if (isLoading) return (
        <div className="loader-container">
            <Loader />
        </div>
    )

    return (
        <div className='stepped-dossier'>
            <div className="container-top">
                <NavLink to="/dossier" className="btn btn-text"><i className="ph-duotone ph-arrow-left"></i> Retour</NavLink>
                <h2>Dossier: {dossier.name}</h2>
                {
                    user.role !== 'superviseur' && user.role !== 'client' && (
                        <Button onClick={e => handleSubmit(e)} className='btn-primary btn-icon' title="Enregistrer"><i className="ph-duotone ph-folder-simple-plus"></i></Button>
                    )
                }
            </div>
            <form onSubmit={e => handleSubmit(e)}>

                <div className="stepper-wrapper">
                    <div className={dossier.etape >= 1 ? 'stepper-item completed' : 'stepper-item'}>
                        <div className="step-counter">1</div>
                    </div>
                    <div className={dossier.etape >= 2 ? 'stepper-item completed' : 'stepper-item'}>
                        <div className="step-counter">2</div>
                    </div>
                    <div className={dossier.etape >= 3 ? 'stepper-item completed' : 'stepper-item'}>
                        <div className="step-counter">3</div>
                    </div>
                    <div className={dossier.etape >= 4 ? 'stepper-item completed' : 'stepper-item'}>
                        <div className="step-counter">4</div>
                    </div>
                    <div className={dossier.etape >= 5 ? 'stepper-item completed' : 'stepper-item'}>
                        <div className="step-counter">5</div>
                    </div>
                </div>

                <Divider width="50%" height="2px" color='#EEE' radius='20px' spacing='1rem' />
                {/* Default */}
                <div className='agent'>
                    <div className="input-group">
                        {/* Nom du dossier */}
                        <Input type="text" label="Nom du dossier" name="name" id="name" placeholder="ex: Mon dossier" disabled value={dossier.name} />
                        {/* Nom du produit */}
                        <Input type="text" label="Nom du produit" name="produit" id="produit" placeholder="ex: Mon produit" disabled value={dossier.produit} />
                    </div>
                    <div className="input-group">
                        {/* Origine */}
                        <Input type="text" label="Origine" name="origin" id="origin" placeholder="ex: France" disabled value={dossier.origin} />
                        {/* Destination */}
                        <Input ype="text" label="Destination" name="destination" id="destination" placeholder="ex: Madagascar" disabled value={dossier.destination} />
                    </div>
                    <div className="input-group">
                        {/* Superviseur */}
                        <Input type="text" value={dossier.superviseur_name} label="Superviseur" disabled />
                        {/* Client */}
                        <Input label="Client" name="client" id="client" placeholder="Choisir un client..." disabled value={dossier.client_name} />
                    </div>
                    <div className="input-group">
                        {/* Agent Opérant */}
                        <Input type="text" value={dossier.agent_operant_name} label="Agent Opérant" name="agent_operant" id="Operant" disabled />
                        {/* Agent Déclarant */}
                        <Input type="text" value={dossier.agent_declarant_name} label="Agent Déclarant" name="agent_declarant" id="declarant" disabled />
                        {/* Agent Terrain */}
                        <Input type="text" value={dossier.agent_terrain_name} label="Agent Terrain" name="agent_terrain" id="terrain" disabled />
                        {/* Agent Finance */}
                        <Input type="text" value={dossier.agent_finance_name} label="Agent Finance" name="agent_finance" id="finance" disabled />
                    </div>
                </div>
                <Divider width="50%" height="2px" color='#EEE' radius='20px' spacing='1rem' />

                {/* Operand */}
                <div className='agent'>
                    <div className="input-group">
                        {/* Nombre de colis */}
                        <Input onChange={handleChange} type="number" label="Nombre de colis" name="nbrcolis" id="nbrcolis" placeholder="ex: 3" disabled={isDisabled('text','nbrcolis', 1)} value={upDossier.nbrcolis} />
                        {/* Compagnie */}
                        <Input onChange={handleChange} type="text" label="Compagnie" name="company" id="company" placeholder="ex: Avitan" disabled={isDisabled('text','company', 1)} value={upDossier.company} />
                    </div>
                    <div className="input-group">
                        {/* Poids */}
                        <Input onChange={handleChange} pattern="^\d*(\.\d{0,2})?$" label="Poids" name="poid" id="poid" placeholder="ex: 1.5" disabled={isDisabled('text','poid', 1)} value={upDossier.poid} />
                        {/* Nature */}
                        <Input onChange={handleChange} type="text" label="Nature" name="nature" id="nature" placeholder="ex: Objet" disabled={isDisabled('text','nature', 1)} value={upDossier.nature} />
                    </div>
                </div>
                <Divider width="50%" height="2px" color='#EEE' radius='20px' spacing='1rem' />

                {/* Declarant */}
                <div className='agent'>
                    <div className="input-group">
                        {/* Numero enregistrement douane */}
                        <Input onChange={handleChange} type="text" label="Numero d'enregistrement douane" name="numero_enr_douane" id="numero_enr_douane" placeholder="ex: Ts kobo" disabled={isDisabled('text','numero_enr_douane', 2)} value={upDossier.numero_enr_douane} />
                        {/* Date d'enregistrement douane */}
                        <Input onChange={handleChange} type="date" label="Date d'enregistrement douane" name="date_enr_douane" id="date_enr_douane" disabled={isDisabled('text','date_enr_douane', 2)} value={upDossier.date_enr_douane ? upDossier.date_enr_douane.split('T')[0] : ''} />
                    </div>
                    <div className="input-group">
                        {/* Prix traitement */}
                        <Input onChange={e => handlePrix(e)} pattern="^\d*(\.\d{0,2})?$" label="Prix traitement" name="prix_traitement" id="prix_traitement" placeholder="ex: Tsy kobo" disabled={isDisabled('decimal','prix_traitement', 2)} value={upDossier.prix_traitement ? upDossier.prix_traitement.$numberDecimal : ''} />
                    </div>
                </div>
                <Divider width="50%" height="2px" color='#EEE' radius='20px' spacing='1rem' />

                {/* Terrain */}
                <div className='agent'>
                    <div className="input-group">
                        {/* Box */}
                        <Input onChange={handleChange} type="text" label="Box" name="boxe" id="boxe" placeholder="ex: Ts kobo" disabled={isDisabled('text','boxe', 3)} value={upDossier.boxe} />
                        {/* Emplacement */}
                        <Input onChange={handleChange} type="text" label="Emplacement" name="emplacement" id="emplacement" placeholder="ex: Ts kobo" disabled={isDisabled('text','emplacement', 3)} value={upDossier.emplacement} />
                    </div>
                </div>
                <Divider width="50%" height="2px" color='#EEE' radius='20px' spacing='1rem' />

                {/* Finance */}
                <div className='agent'>
                    <div className="input-group">
                        {/* Taxe */}
                        <Input onChange={e => handleTaxe(e)} pattern="^\d*(\.\d{0,2})?$" label="Taxe" name="taxe" id="taxe" placeholder="ex: Ts kobo" disabled={isDisabled('decimal','taxe', 4)} value={upDossier.taxe ? upDossier.taxe.$numberDecimal : ''} />
                        {/* Facturation */}
                        <Input type="text" label="Facturation" name="facturation" id="facturation" placeholder="ex: Ts kobo" disabled value={upDossier.facturation ? upDossier.facturation.$numberDecimal : ''} />
                    </div>
                </div>


                {
                    (upDossier.etape === 5) || user.role !== 'superviseur' && user.role !== 'client' && (
                        <Button type='submit' className='btn-primary btn-text'>Enregistrer</Button>
                    )
                }
            </form>
        </div>
    )
}

export default SteppedDossier