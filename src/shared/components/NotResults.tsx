interface NotResultsProps {
    message?: string
}

const NotResults: React.FC<NotResultsProps> = ({ message }) => {
    return (
        <div className="text-center font-semibold text-base mt-5">
        <p>{ message ? message : "Sin resultados" }</p>
        </div>
    );
}

export default NotResults;