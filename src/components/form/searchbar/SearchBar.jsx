import './SearchBar.scss'

const SearchBar = ({ ...rest }) => {
  return (
    <div className="searchbar">
      <i className="ph ph-magnifying-glass"></i>
      <input type="search" name="search" id="search" {...rest} placeholder="Rechercher" />
    </div>
  )
}

export default SearchBar