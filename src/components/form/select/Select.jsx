import './Select.scss'

const Select = ({ label, name, id, children, placeholder, ...rest }) => {
    return (
        <div className='select'>
            <select name={name} id={id} {...rest}>
                <option value=""></option>
                {children}
            </select>
            <label htmlFor={name}>{label}</label>
        </div>
    )
}

export default Select