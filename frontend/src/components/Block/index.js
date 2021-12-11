const Block = ({ children, compClass }) => {
    return (
        <div className={`${compClass}`}>
            <div className="p-4 bg-white rounded-2xl w-100 shadow-flat">
                {children}
            </div>
        </div>
    )
}

export default Block;