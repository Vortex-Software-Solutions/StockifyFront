import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useGetRoleQuery } from "../../core/features/roleServerApi"; // Asegúrate de que la ruta sea correcta
import { toast } from "sonner";
import { RoleUpdateDto } from "../../core/models/dtos/roles/roleUpdateDto"; // Asegúrate de que la ruta sea correcta
import LoaderBig from "../../shared/components/LoaderBig";
import { useUpdateRoleMutation } from "../../core/features/roleServerApi"; // Asegúrate de que la ruta sea correcta

const RoleUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams<string>();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<RoleUpdateDto>();

    const {
        data,
        isLoading,
    } = useGetRoleQuery(id!, { skip: !id });

    const [updateRole] = useUpdateRoleMutation();

    const submitForm = (data: RoleUpdateDto) => {
        const updatePromise = updateRole(data).unwrap();

        toast.promise(updatePromise, {
            loading: "Actualizando...",
            success: () => {
                navigate(-1);
                return "Rol actualizado con éxito";
            },
            error: (err) => {
                console.error(err);
                return "Error al actualizar el rol";
            },
        });
    };

    useEffect(() => {
        if (data && !isLoading) {
            const { title, description, id } = data.dataObject!;
            setValue('id', id);
            setValue('title', title);
            setValue('description', description);
        }
    }, [data, isLoading]);

    if (isLoading) return <LoaderBig />;

    return (
        <div className='w-full bg-white min-h-full rounded-md'>
            <div className='flex gap-2 items-center justify-between text-sm text-gray-500 font-semibold px-10 py-4'>
                <div className="flex items-center gap-5">
                    <h2 className='text-lg'>Modificar Rol</h2>

                    <Link to="/roles" className="flex items-center gap-1 text-grey-light">
                        <FaArrowCircleLeft size={19} />
                        <p>Volver</p>
                    </Link>
                </div>
            </div>

            <hr className="divisor" />

            <div className='text-gray-500 font-semibold p-5 overflow-auto'>
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                        <div className="input-container">
                            <label htmlFor="title" className="label-form">Título</label>
                            <input
                                type="text"
                                className="input-form"
                                {...register("title", { required: "Título requerido" })}
                            />
                            {errors.title && <span className="form-error">{errors.title.message}</span>}
                        </div>

                        <div className="input-container">
                            <label htmlFor="description" className="label-form">Descripción</label>
                            <textarea
                                className="input-form"
                                {...register("description")}
                            />
                            {errors.description && <span className="form-error">{errors.description.message}</span>}
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <button type="submit" className="submit-button">Actualizar</button>
                        <button type="button" className="cancel-button" onClick={() => navigate(-1)}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoleUpdate;
