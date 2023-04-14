import './Checkbox.scss'

const Checkbox = ({ label, name, id, ...rest }) => {
    return (
        <div className="checkbox">
            <label htmlFor={name}>{label}</label>
            <input name={name} id={id} {...rest} />
        </div>
    )
}

export default Checkbox