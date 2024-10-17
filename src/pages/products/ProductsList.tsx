import {Link} from "react-router-dom";
import {IoMdAddCircle, IoMdSearch} from "react-icons/io";
import React, {useState} from "react";

const ProductsList = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchTrigger, setSearchTrigger] = useState("");

    const handleSearchClick = () => {

    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearchTrigger(searchTerm);
        }
    }

    /*
        Dividir la UI en estas partes:
        - Barra de busqueda
        - Seccion de categorias (grid de 3col 2rows) (poner link a pagina con todas las categorias)
        - Seccion de productos (grid de 4 col 3 rows) (por defecto sin filtro) (poner link para los detalles de cada uno)
        - barra de paginacion

    */

    return (
        <div className='w-full bg-white min-h-full rounded-md'>
            <section
                className='flex flex-col md:flex-row gap-2 items-start md:items-center justify-between text-sm text-gray-500 font-semibold px-10 py-4'>

                <div className="flex items-center gap-2 md:gap-5">
                    <h2 className='text-lg'>Tus productos</h2>

                    <Link to="/companies/create" className="flex items-center gap-1 text-green-action">
                        <IoMdAddCircle
                            size={24}
                        />

                        <p className="hidden md:flex">Agregar</p>
                    </Link>
                </div>

                <div className="flex items-center gap-2 relative font-normal">
                    <input
                        type="text"
                        placeholder="Buscar productos"
                        className="border border-gray-300 placeholder:text-sm rounded-lg shadow-sm p-1 md:p-2 pr-9 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <IoMdSearch size={24} className="cursor-pointer absolute right-2 text-gray-400"
                                onClick={handleSearchClick}/>
                </div>
            </section>

            <hr className="divisor"/>

            {/* Seccion de categorias */}
            <section className="px-10 py-5">
                <div className="flex items-center gap-2 md:gap-5">
                    <p>Tus categorias</p>
                    <Link to="/companies/create" className="flex items-center gap-1 text-green-action">
                        <IoMdAddCircle
                            size={24}
                        />

                        <p className="hidden md:flex">Agregar</p>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3">

                    <div className={`flex flex-col items-center gap-2 rounded `}>

                        <p>Categoria</p>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default ProductsList;