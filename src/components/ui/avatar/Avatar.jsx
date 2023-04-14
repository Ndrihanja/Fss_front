import './Avatar.scss'

const Avatar = ({ user, height, width, rounded }) => {
    const sigle = user.name.charAt(0)
    return (
        <div className="avatar" style={{
            height: height,
            width: width,
            borderRadius: rounded ? '100%' : '10px'
        }} title={user.name}>
            {/* {<i className="ph-duotone ph-user"></i>} */}
            {sigle.toUpperCase()}
        </div>
    )
}

export default Avatar