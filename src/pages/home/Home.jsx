import { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { api } from '../../services/api-request'
import ReactEcharts from 'echarts-for-react'
import './Home.scss'

const Home = () => {
  const { user } = useContext(AuthContext)
  const [agentCount, setAgentCount] = useState(0)
  const [clientCount, setClientCount] = useState(0)
  const [dossierCount, setDossierCount] = useState(0)
  const [etapes, setEtapes] = useState({
    etape1: 0,
    etape2: 0,
    etape3: 0,
    etape4: 0,
    etape5: 0
  })

  const option = {
    series: [
      {
        type: 'pie',
        itemStyle: {
          borderRadius: 10,
        },
        data: [
          {
            value: etapes.etape1,
            name: 'Dossiers en étape 1',
            itemStyle: { color: '#F7D656' },
          },
          {
            value: etapes.etape2,
            name: 'Dossiers en étape 2',
            itemStyle: { color: '#FCD32E' },
          },
          {
            value: etapes.etape3,
            name: 'Dossiers en étape 3',
            itemStyle: { color: '#FFCC00' },
          },
          {
            value: etapes.etape4,
            name: 'Dossiers en étape 4',
            itemStyle: { color: '#F25815' },
          },
          {
            value: etapes.etape5,
            name: 'Dossiers en étape 5',
            itemStyle: { color: '#E9261D' },
          }
        ],
        roseType: 'area'
      }
    ]
  };

  useEffect(() => {
    api.get('dashboard/count-agent').then(response => setAgentCount(response))
    api.get('dashboard/count-client').then(response => setClientCount(response))
    api.get('dashboard/count-dossier').then(response => setDossierCount(response))
    api.get(`dashboard/count-dossier-etape/1`, { params: { etape: 1 } }).then(response => setEtapes(etapes => ({ ...etapes, etape1: response })))
    api.get(`dashboard/count-dossier-etape/2`, { params: { etape: 2 } }).then(response => setEtapes(etapes => ({ ...etapes, etape2: response })))
    api.get(`dashboard/count-dossier-etape/3`, { params: { etape: 3 } }).then(response => setEtapes(etapes => ({ ...etapes, etape3: response })))
    api.get(`dashboard/count-dossier-etape/4`, { params: { etape: 4 } }).then(response => setEtapes(etapes => ({ ...etapes, etape4: response })))
    api.get(`dashboard/count-dossier-etape/5`, { params: { etape: 5 } }).then(response => setEtapes(etapes => ({ ...etapes, etape5: response })))

  }, [])

  if (user.role === 'client') return <Navigate to='/dossier' />

  return (
    <div className='dashboard'>
      <div className='count'>
        <div className="stat-card">
          <div className="card-text">
            <span>Agents</span>
            <h1>{agentCount}</h1>
          </div>
          <div className="card-icon">
            <i className="ph-duotone ph-user-gear"></i>
          </div>
        </div>
        <div className="stat-card">
          <div className="card-text">
            <span>Clients</span>
            <h1>{clientCount}</h1>
          </div>
          <div className="card-icon">
            <i className="ph-duotone ph-users"></i>
          </div>
        </div>
        <div className="stat-card">
          <div className="card-text">
            <span>Dossiers</span>
            <h1>{dossierCount}</h1>
          </div>
          <div className="card-icon">
            <i className="ph-duotone ph-folders"></i>
          </div>
        </div>
      </div>
      <div className='chart'>
        <h4>Dossiers par étapes</h4>
        <ReactEcharts option={option} style={{ width: "100%", height: '100%' }} />
      </div>
    </div>
  )
}

export default Home