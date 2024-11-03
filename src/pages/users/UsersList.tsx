import { UserDto } from "src/core/models/dtos/users/userDto";
import {
    useListUsersQuery,
    useSoftDeleteUserMutation,
    useUpdateUserMutation,
    useCreateUserMutation
} from "src/core/features/userServerApi";
import React, { useEffect, useState } from "react";
import SkeletonTable from "src/shared/components/SkeletonTable";
import Tooltip from "src/shared/components/Tooltip";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosCheckmarkCircle, IoMdAddCircle } from "react-icons/io";
import DeleteModal from "src/shared/components/DeleteModal";
import NotResults from "src/shared/components/NotResults";
import { toast } from "sonner";
import SearchBar from "src/shared/components/SearchBar";

const UsersList: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [normalizedData, setNormalizedData] = useState<UserDto[]>();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchTrigger, setSearchTrigger] = useState<string>('');
    const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const { data: users, isFetching: usersIsFetching, isLoading: usersIsLoading } = useListUsersQuery();

    const [softDeleteUser] = useSoftDeleteUserMutation();

    const handleDelete = (id: string) => {
        const deletePromise = softDeleteUser(id).unwrap();

        toast.promise(deletePromise, {
            loading: "Cargando",
            success: "Usuario eliminado con éxito",
            error: (err) => {
                console.error(err);
                return "Error al eliminar usuario";
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

    useEffect(() => {
        if (users && !usersIsFetching) setNormalizedData(users.listDataObject);
    }, [users, usersIsFetching]);

    if (usersIsLoading) return <SkeletonTable />;

    return (
        <div className='w-full bg-white min-h-full rounded-md'>
            <div className='flex gap-2 items-center justify-between text-sm text-gray-500 font-semibold px-10 py-4'>
                <div className="flex items-center gap-5">
                    <h2 className='text-lg'>Usuarios</h2>
                    <Link to="/users/create" className="flex items-center gap-1 text-green-action">
                        <IoMdAddCircle size={24} />
                        <p>Agregar</p>
                    </Link>
                </div>
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearchClick}
                    placeholder="Buscar usuario"
                />
            </div>

            <hr className="divisor" />

            <div className='text-gray-500 font-semibold borde p-5 w-[95%] ml-5 mt-5 overflow-auto'>
                {normalizedData && normalizedData.length > 0 ? (
                    <table className="table-auto w-full text-sm rounded-md flex-1">
                        <thead className='border-b font-medium dark:border-neutral-500'>
                            <tr>
                                <th className='text-left'>Nombre</th>
                                <th className='text-left'>Email</th>
                                <th className='text-left'>Perfil</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {normalizedData.map((item) => (
                                <tr key={item.id} className="border-b text-gray-700 dark:border-neutral-500 hover:bg-blue-500/5 hover:cursor-pointer">
                                    <td className='whitespace-nowrap py-4 font-normal text-left'>
                                        <Link to={`/users/${item.id}`} className="hover:underline">
                                            {item.name} {item.firstLastName} {item.secondLastName}
                                        </Link>
                                    </td>
                                    <td className='whitespace-nowrap py-4 font-normal text-left'>{item.email}</td>
                                    <td className='whitespace-nowrap py-4 font-normal text-left'>{item.roleId}</td>
                                    <td className='flex gap-6 items-center justify-center ml-5 py-4'>
                                        <Link to={`/users/edit/${item.id}`}>
                                            <FaEdit className='text-primary-purple' />
                                        </Link>
                                        <FaTrash className='text-red-500' onClick={() => toggleDeleteModal(item.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : <NotResults message="Aún no hay usuarios"/>}
            </div>
            {showDeleteModal && (
                <DeleteModal deleteId={deleteId!} toggleModal={toggleDeleteModal} deleteAction={handleDelete} />
            )}
        </div>
    );
};

export default UsersList;
