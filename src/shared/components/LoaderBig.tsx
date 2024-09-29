import { FaSpinner } from "react-icons/fa";

type LoaderProps = {
    message?: string;
}

const LoaderBig: React.FC<LoaderProps> = ({ message }) => {
    return (
        <div>
            <FaSpinner className="animate-spin h-10 w-10 text-gray-700" />
            <p className='font-bold text-gray-700'>{message || "Cargando..."}</p>
        </div>
    )
}

export default LoaderBig;