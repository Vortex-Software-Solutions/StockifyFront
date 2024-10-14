import {CompanyDto} from "../../../core/models/dtos/companies/companyDto.ts";
import {
    useDisableCompanyMutation, useEnableCompanyMutation,
    useListCompaniesQuery,
    useSearchCompanyQuery, useSoftDeleteCompanyMutation
} from "../../../core/features/companyServerApi.ts";
import React, {useEffect, useState} from "react";
import SkeletonTable from "../../../shared/components/SkeletonTable.tsx";
import Tooltip from "../../../shared/components/Tooltip.tsx";
import {Link} from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa";
import {MdBlock} from "react-icons/md";
import {IoIosCheckmarkCircle, IoMdAddCircle, IoMdSearch} from "react-icons/io";
import DeleteModal from "../../../shared/components/DeleteModal.tsx";
import NotResults from "../../../shared/components/NotResults.tsx";
import {toast} from "sonner";

/*
* Explicacion documentada:
*
* 1. Primero se declaran los states
* 2. Se extraen los datos de las queries
* 3. Se extraen las mutaciones de la correspondiente api
* 4. Se declaran las funciones que se encargaran de manejar las mutaciones
* 5. Se usan useEffects para normalizar los datos y setearlos en el state
* 6. Se crea la interfaz
*/

const CompaniesList: React.FC = () => {

    const [page, setPage] = useState<number>(1);
    const [normalizedData, setNormalizedData] = useState<CompanyDto[]>();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchTrigger, setSearchTrigger] = useState<string>('');
    const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const {
        data: companies,
        isFetching: companiesIsFetching,
        isLoading: companiesIsLoading
    } = useSearchCompanyQuery({page, term: searchTrigger}, {refetchOnMountOrArgChange: true});

    const [disable] = useDisableCompanyMutation();
    const [enable] = useEnableCompanyMutation();
    const [deleteCompany] = useSoftDeleteCompanyMutation();

    const handleDisable = (id: string) => {
        const disablePromise = disable(id).unwrap();

        toast.promise(disablePromise, {
            loading: "Cargando",
            success: () => {
                return "Exito";
            },
            error: (err) => {
                console.error(err);
                return "Algo salio mal";
            }
        })
    }

    const handleDelete = (id: string) => {
        const deletePromise = deleteCompany(id).unwrap();

        toast.promise(deletePromise, {
            loading: "Cargando",
            success: () => {
                return "Exito";
            },
            error: (err) => {
                console.error(err);
                return "Algo salio mal";
            }
        })
    }

    const handleEnable = (id: string) => {
        const enablePromise = enable(id).unwrap();

        toast.promise(enablePromise, {
            loading: "Cargando",
            success: () => {
                return "Exito";
            },
            error: (err) => {
                console.error(err);
                return "Algo salio mal";
            }
        })
    }

    const toggleDeleteModal = (id?: string) => {
        if (id) setDeleteId(id);
        setShowDeleteModal(!showDeleteModal);
    }

    const handleSearchClick = () => {
        setSearchTrigger(searchTerm);
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearchTrigger(searchTerm);
        }
    }

    useEffect(() => {
        if (companies && !companiesIsFetching)
            setNormalizedData(companies.listDataObject)
    }, [companies, companiesIsFetching]);

    if (companiesIsLoading) return <SkeletonTable/>

    return (
        <div className='w-full bg-white min-h-full rounded-md'>
            <div
                className='flex gap-2 items-center justify-between text-sm text-gray-500 font-semibold px-10 py-4'>

                <div className="flex items-center gap-5">
                    <h2 className='text-lg'>Empresas</h2>

                    <Link to="/companies/create" className="flex items-center gap-1 text-green-action">
                        <IoMdAddCircle
                            size={24}
                        />

                        <p>Agregar</p>
                    </Link>
                </div>

                <div className="flex items-center gap-2 relative font-normal">
                    <input
                        type="text"
                        placeholder="Buscar empresa"
                        className="border border-gray-300 placeholder:text-sm rounded-lg shadow-sm p-2 pr-9 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <IoMdSearch size={24} className="cursor-pointer absolute right-2 text-gray-400" onClick={handleSearchClick}/>
                </div>
            </div>

            <hr className="divisor"/>

            <div className='text-gray-500 font-semibold borde p-5 w-[95%] ml-5 mt-5 oerflow-auto'>
                {normalizedData && normalizedData?.length > 0 ? (
                    <>
                        <table className="table-auto w-full text-sm rounded-md flex-1">
                            <thead className='border-b font-medium dark:border-neutral-500'>
                            <tr>
                                <th className='text-left'>Nombre</th>
                                <th className='text-left'>Estatus</th>
                                <th className='text-left'>Contacto</th>
                                <th className='text-left'>RFC</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                normalizedData.map((item) => (
                                    <tr key={item.id}
                                        className="border-b text-gray-700 dark:border-neutral-500 hover:bg-blue-500/5 hover:cursor-pointer">
                                        <td className='whitespace-nowrap py-4 font-normal text-left'>
                                            <Link to={`${item.id}`} className="hover:underline">
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td className={`whitespace-nowrap py-4 font-normal text-left ${!item.enabled && "text-red-500 font-medium"}`}>{item.enabled ? "Activa" : "Suspendida"}</td>
                                        <td className='whitespace-nowrap py-4 font-normal text-left'>{item.phoneNumber}</td>
                                        <td className='whitespace-nowrap py-4 font-normal text-left'>{item.rfc}</td>
                                        <td className='flex gap-6 items-center justify-center ml-5 py-4'>
                                            {item.enabled ?
                                                (
                                                    <Tooltip title={"Desabilitar"}>
                                                        <MdBlock className="text-amber-500
                                         hover:text-amber-400" size={18}
                                                                 onClick={() => handleDisable(item.id)}
                                                        />
                                                    </Tooltip>
                                                ) :
                                                (
                                                    <Tooltip title={"Habilitar"}>
                                                        <IoIosCheckmarkCircle
                                                            className="text-emerald-500 hover:text-emerald-400"
                                                            size={18}
                                                            onClick={() => handleEnable(item.id)}
                                                        />
                                                    </Tooltip>
                                                )}

                                            <Link to={`edit/${item.id}`}>
                                                <FaEdit className='text-primary-purple'/>
                                            </Link>
                                            <FaTrash className='text-red-500'
                                                     onClick={() => toggleDeleteModal(item.id)}/>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>

                        <div className='flex justify-center gap-4 mt-7'>
                            <button
                                className='bg-primary-purple text-white rounded-md px-4 text-sm py-1 font-semibold disabled:opacity-70 disabled:cursor-not-allowed'
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                            >
                                Anterior
                            </button>
                            <button
                                className='bg-primary-purple text-white rounded-md px-4 text-sm py-1 font-semibold disabled:opacity-70 disabled:cursor-not-allowed'
                                onClick={() => setPage(page + 1)}
                                disabled={page === companies?.totalPages}
                            >
                                Siguiente
                            </button>
                        </div>
                    </>
                ) : <NotResults message="Aun no hay datos"/>}
            </div>
            {showDeleteModal &&
                <DeleteModal deleteId={deleteId!} toggleModal={toggleDeleteModal} deleteAction={handleDelete}/>}
        </div>
    );
}

export default CompaniesList;