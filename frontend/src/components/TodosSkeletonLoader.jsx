export const TodoSkeletionLoader = () => {
    return <div className="w-full flex flex-col gap-3 animate-pulse">
        <div className="w-full h-20 bg-blue-300 border border-blue-100 mt-4 sm:mt-3"></div>
        <div className="w-full h-20 bg-blue-300 border border-blue-100"></div>
        <div className="w-full h-20 bg-blue-300 border border-blue-100"></div>
        <div className="w-full h-20 bg-blue-300 border border-blue-100"></div>
        <div className="w-full h-20 bg-blue-300 border border-blue-100"></div>
        <div className="hidden md:block w-full h-20 bg-blue-300 border border-blue-100"></div>
    </div>
}