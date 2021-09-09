export default function ButtonRounded({ children, compClass, isActive, color, onClick, type }) {
    return (
        <button 
            className={"uppercase text-xs py-1 px-3 font-semibold rounded-full border border-solid text-center active:bg-gradient-to-br active:text-white " + (color === "blue" ? `bg-gradient-to-br text-white from-blue to-blue-dark border-blue hover:border-white ` : " border-blue text-blue from-blue to-blue-dark ") + (compClass ? compClass : "") + (isActive ? " bg-gradient-to-br from-blue to-blue-dark text-white cursor-default" : " hover:shadow ")}
            onClick={onClick && (() => onClick())}
            type={type}
        >
            {children}
        </button>
    );
}