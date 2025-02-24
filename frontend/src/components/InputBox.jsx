export const InputBox = ({ name,value,onChange,placeholder }) => {
    return (
        <input 
            type='text'
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
            className="bg-black border-2 border-blue-300/30 rounded p-3 w-full sm:w-3/5 md:w-full text-white focus:border-2 focus:border-blue-500 outline-none hover:border-blue-300"
        />
    )
}