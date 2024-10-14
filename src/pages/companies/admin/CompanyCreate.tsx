import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {FaArrowCircleLeft} from "react-icons/fa";
import {CompanyCreateDto} from "../../../core/models/dtos/companies/companyCreateDto.ts";
import {useForm} from "react-hook-form";
import {useCreateCompanyMutation} from "../../../core/features/companyServerApi.ts";
import {toast} from "sonner";

const CompanyCreate = () => {

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<CompanyCreateDto>()

    const [create] = useCreateCompanyMutation()

    const submitForm = (data: CompanyCreateDto) => {
        const createPromise = create(data).unwrap()

        toast.promise(createPromise, {
            loading: "Creando...",
            success: () => {
                navigate(-1)
                return "Empresa creada"
            },
            error: (err) => {
                console.error(err)
                return "Error al crear"
            }
        })
    }

    return (
        <div className='w-full bg-white min-h-full rounded-md'>
            <div
                className='flex gap-2 items-center justify-between text-sm text-gray-500 font-semibold px-10 py-4'>

                <div className="flex items-center gap-5">
                    <h2 className='text-lg'>Nueva Empresa</h2>

                    <Link to="/companies" className="flex items-center gap-1 text-grey-light">
                        <FaArrowCircleLeft
                            size={19}
                        />

                        <p>Volver</p>
                    </Link>
                </div>
            </div>

            <hr className="divisor"/>

            <div className='text-gray-500 font-semibold borde p-5 w-[95%] ml-5 mt-5 oerflow-auto'>

                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="grid grid-cols-2 gap-x-5">
                        <div className="input-container">
                            <label htmlFor="name" className="label-form">Nombre</label>
                            <input type="text" className="input-form"
                                   {...register("name", {required: "Nombre requerido"})}
                            />
                            {errors.name && <span className="form-error">{errors.name.message}</span>}
                        </div>

                        <div className="input-container">
                            <label htmlFor="contact" className="label-form">Contacto</label>
                            <input type="text" className="input-form"
                                   {...register("phoneNumber", {required: "Contacto requerido"})}
                            />
                            {errors.phoneNumber && <span className="form-error">{errors.phoneNumber.message}</span>}
                        </div>

                        <div className="input-container">
                            <label htmlFor="rfc" className="label-form">RFC</label>
                            <input type="text" className="input-form"
                                   {...register("rfc", {required: "RFC requerido"})}
                            />
                            {errors.rfc && <span className="form-error">{errors.rfc.message}</span>}
                        </div>
                    </div>

                    <div className="input-container">
                        <label htmlFor="description" className="label-form">Descripción</label>
                        <textarea className="input-form"
                                  {...register("description")}
                        />
                        {errors.description && <span className="form-error">{errors.description.message}</span>}
                    </div>

                    <div className="flex gap-5">
                        <button type="submit" className="submit-button">Agregar</button>

                        <button type="button" className="cancel-button" onClick={() => navigate(-1)}>Cancelar</button>
                    </div>

                </form>

            </div>
        </div>
    );
}

export default CompanyCreate