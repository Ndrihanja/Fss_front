const Divider = ({ width, height, radius, color, spacing }) => {
    const style = {
        width: width,
        height: height,
        borderRadius: radius,
        backgroundColor: color,
        margin: spacing,
    }
    return (
        <div style={style}>
        </div>
    )
}

export default Divider