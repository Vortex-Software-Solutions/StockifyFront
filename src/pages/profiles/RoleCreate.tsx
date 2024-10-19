import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { RoleCreateDto } from "../../core/models/dtos/roles/roleCreateDto";
import { useForm } from "react-hook-form";
import { useCreateRoleMutation } from "../../core/features/roleServerApi";
import { toast } from "sonner";

const RoleCreate = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RoleCreateDto>();

    const [create] = useCreateRoleMutation();

    const submitForm = (data: RoleCreateDto) => {
        const createPromise = create(data).unwrap();

        toast.promise(createPromise, {
            loading: "Creando...",
            success: () => {
                navigate(-1);
                return "Perfil creado";
            },
            error: (err) => {
                console.error(err);
                return "Error al crear el perfil";
            }
        });
    };

    return (
        <div className='w-full bg-white min-h-full rounded-md'>
            <div className='flex gap-2 items-center justify-between text-sm text-gray-500 font-semibold px-10 py-4'>
                <div className="flex items-center gap-5">
                    <h2 className='text-lg'>Nuevo Perfil</h2>
                    <Link to="/profiles" className="flex items-center gap-1 text-grey-light">
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
                            <input type="text" className="input-form"
                                   {...register("title", { required: "Título requerido" })} 
                            />
                            {errors.title && <span className="form-error">{errors.title.message}</span>}
                        </div>

                        <div className="input-container">
                            <label htmlFor="description" className="label-form">Descripción</label>
                            <textarea className="input-form"
                                      {...register("description", { required: "Descripción requerida" })}
                            />
                            {errors.description && <span className="form-error">{errors.description.message}</span>}
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <button type="submit" className="submit-button">Agregar</button>
                        <button type="button" className="cancel-button" onClick={() => navigate(-1)}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoleCreate;
