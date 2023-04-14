import './Input.scss'

const Input = ({ label, name, id, ...rest }) => {
    return (
        <div className="input">
            <input name={name} id={id} {...rest} />
            <label htmlFor={name}>{label}</label>
        </div>
    )
}

export default Input