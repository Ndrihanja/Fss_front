import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import Container from '../container/Container'
import './MainLayout.scss'

const MainLayout = ({ children }) => {
  return (
    <div className='main-layout'>
      <Sidebar />
      <div className="main-layout-body">
        <Navbar />
        <Container>{children}</Container>
        <span className='copyright'>Copyright © Ditra 2023 - Tous droits réservés</span>
      </div>
    </div>
  )
}

export default MainLayout