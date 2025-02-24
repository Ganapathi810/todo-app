export const Button = ({ disabled,children,onClick,className }) => {

    return <button disabled={disabled} onClick={onClick} className={`${className} rounded-md  w-full sm:w-3/5 md:w-full transition-colors ease-in-out`}>
        {children}
    </button>
}