const Card = ({ children, title, subtitle, compClass }) => {
    return (
        <div className={`flex z-10 justify-end ${compClass}`}>
            <div className="p-12 bg-white rounded-2xl w-100 shadow-lg">
                <div className="mb-4">
                    <h3 className="font-semibold text-2xl text-gray-800">{title}</h3>
                    <p className="text-gray-500">{subtitle}</p>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Card;