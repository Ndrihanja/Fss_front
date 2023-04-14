import './Navbar.scss'
import SearchBar from '../../components/form/searchbar/SearchBar'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import Avatar from '../../components/ui/avatar/Avatar'
import Divider from '../../components/ui/divider/Divider'

const Navbar = () => {
  const { user } = useContext(AuthContext)

  const handleSearch = (e) => {
    console.log(e.target.value)
  }
  return (
    <nav>
      <div className='search-parent'>
        <SearchBar onChange={e => handleSearch(e)} />
      </div>
      <div className='user'>
        <button className='btn-secondary btn-icon'><i className="ph-duotone ph-bell-simple"></i></button>
        <Divider width='1px' height='2rem' color='#EEE' />
        <Avatar user={user} height="40px" width="40px" rounded={true} />
      </div>
    </nav>
  )
}

export default Navbar