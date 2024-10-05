import { FaSpinner } from "react-icons/fa";

type LoaderProps = {
    message?: string;
}

const LoaderBig: React.FC<LoaderProps> = ({ message }) => {
    return (
        <div className="flex justify-center items-center flex-col gap-2">
            <FaSpinner className="animate-spin h-10 w-10 text-gray-700" />
            <p className='font-bold text-gray-700 text-center'>{message || "Cargando..."}</p>
        </div>
    )
}

export default LoaderBig;