const BarPercent = ({color, percent}) => {
    return (
        <div className="w-full h-2 my-2 rounded-full overflow-hidden bg-gradient-to-b from-gray-200 to-gray-100">
            <div className={`h-full rounded-full bg-gradient-to-br for ${color ? `from-${color}-600 to-${color}-700` : "from-blue to-blue-dark"}`} style={{width: percent + '%'}}></div>
        </div>
    )
}

export default BarPercent;