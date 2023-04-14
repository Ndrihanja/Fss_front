import { useContext, useState } from 'react'
import './Sidebar.scss'
import logo from '../../assets/logo.png'
import Button from '../../components/ui/button/Button'
import { NavLink } from 'react-router-dom'
import { SidebarLinkClassicData, SidebarLinkClientData } from '../../data/SidebarLinkData'
import AuthContext from '../../context/AuthContext'

const Sidebar = () => {
  const { user } = useContext(AuthContext)
  const [isClosed, setIsClosed] = useState(false)
  const { logout } = useContext(AuthContext)


  return (
    <div className={'sidebar ' + (isClosed ? 'closed' : '')}>
      <div className='sidebar-nav'>
        <div className="nav-top">
          <div className="logo">
            <div className="logo-img">
              <img src={logo} alt="logo" />
            </div>
            {
              !isClosed && (<h3>Suivie</h3>)
            }
          </div>
          <Button className="btn-secondary btn-icon" onClick={() => setIsClosed(!isClosed)}><i className={"ph-duotone ph-caret-" + (isClosed ? 'right' : 'left')}></i></Button>
        </div>
        <ul className="nav-middle">
          {
            user.role !== 'client'
              ? (
                SidebarLinkClassicData.map((dataLink, index) => <li key={index}>
                  <NavLink className="sidebar-link" to={dataLink.path}>
                    <i className={dataLink.icon}></i>
                    {
                      !isClosed && (<span>{dataLink.name}</span>)
                    }
                  </NavLink>
                </li>)
              )
              : (
                SidebarLinkClientData.map((dataLink, index) => <li key={index}>
                  <NavLink className="sidebar-link" to={dataLink.path}>
                    <i className={dataLink.icon}></i>
                    {
                      !isClosed && (<span>{dataLink.name}</span>)
                    }
                  </NavLink>
                </li>)
              )
          }
        </ul>
      </div>
      <div>
        <Button className="sidebar-link" onClick={() => logout()}>
          <i className="ph-duotone ph-sign-out"></i>
          {
            !isClosed && (<span>Se déconnecter</span>)
          }
        </Button>
      </div>
    </div>
  )
}

export default Sidebar