import React, { useEffect, useState } from "react";
import { RoleDto } from 'src/core/models/dtos/roles/roleDto';
import {
    useListRolesQuery,
    useSoftDeleteRoleMutation,
} from 'src/core/features/roleServerApi';
import SkeletonTable from "../../shared/components/SkeletonTable";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdAddCircle, IoMdSearch } from "react-icons/io";
import DeleteModal from "../../shared/components/DeleteModal";
import NotResults from "../../shared/components/NotResults";
import { toast } from "sonner";

const RoleList: React.FC = () => {
    const [normalizedData, setNormalizedData] = useState<RoleDto[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchTrigger, setSearchTrigger] = useState<string>('');
    const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const {
        data: roles,
        isFetching: rolesIsFetching,
        isLoading: rolesIsLoading,
    } = useListRolesQuery(undefined, { refetchOnMountOrArgChange: true });

    const [deleteRole] = useSoftDeleteRoleMutation();

    const handleDelete = (id: string) => {
        const deletePromise = deleteRole(id).unwrap();

        toast.promise(deletePromise, {
            loading: "Cargando",
            success: () => {
                toggleDeleteModal();
                return "Éxito";
            },
            error: (err) => {
                console.error(err);
                return "Algo salió mal";
            }
        });
    };

    const toggleDeleteModal = (id?: string) => {
        if (id) setDeleteId(id);
        setShowDeleteModal(!showDeleteModal);
    };

    const handleSearchClick = () => {
        setSearchTrigger(searchTerm);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearchTrigger(searchTerm);
        }
    };

    useEffect(() => {
        if (roles && !rolesIsFetching) {
            setNormalizedData(roles.listDataObject || []); // Manejo de undefined
        }
    }, [roles, rolesIsFetching]);

    if (rolesIsLoading) return <SkeletonTable />;

    return (
        <div className='w-full bg-white min-h-full rounded-md'>
            <div className='flex flex-col md:flex-row gap-2 items-start md:items-center justify-between text-sm text-gray-500 font-semibold px-10 py-4'>
                <div className="flex items-center gap-2 md:gap-5">
                    <h2 className='text-lg'>Roles</h2>
                    <Link to="/roles/create" className="flex items-center gap-1 text-green-action">
                        <IoMdAddCircle size={24} />
                        <p className="hidden md:flex">Agregar</p>
                    </Link>
                </div>
                <div className="flex items-center gap-2 relative font-normal">
                    <input
                        type="text"
                        placeholder="Buscar rol"
                        className="border border-gray-300 placeholder:text-sm rounded-lg shadow-sm p-1 md:p-2 pr-9 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <IoMdSearch size={24} className="cursor-pointer absolute right-2 text-gray-400" onClick={handleSearchClick} />
                </div>
            </div>

            <hr className="divisor" />

            {normalizedData.length > 0 ? (
                <>
                    <div className='text-gray-500 font-semibold borde p-10 overflow-x-auto'>
                        <table className="table-auto text-sm rounded-md flex-1 w-full overflow-x-auto">
                            <thead className='border-b font-medium dark:border-neutral-500'>
                                <tr>
                                    <th className='text-left'>Título</th>
                                    <th className='text-left'>Descripción</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {normalizedData.map((item) => (
                                    <tr key={item.id} className="border-b text-gray-700 dark:border-neutral-500 hover:bg-blue-500/5 hover:cursor-pointer">
                                        <td className='whitespace-nowrap py-4 font-normal text-left'>{item.title}</td>
                                        <td className='whitespace-nowrap py-4 font-normal text-left'>{item.description}</td>
                                        <td className='flex gap-6 items-center justify-center ml-5 py-4'>
                                            <Link to={`edit/${item.id}`}>
                                                <FaEdit className='text-primary-purple' />
                                            </Link>
                                            <FaTrash className='text-red-500' onClick={() => toggleDeleteModal(item.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {showDeleteModal && <DeleteModal deleteId={deleteId!} toggleModal={toggleDeleteModal} deleteAction={handleDelete} />}
                </>
            ) : <NotResults message="Aún no hay datos" />}
        </div>
    );
}

export default RoleList;
