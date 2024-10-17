import {saveUserInfo, selectUserData} from "../../core/slices/auth/authSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {RegisterCompanyDto} from "../../core/models/dtos/companies/registerCompanyDto.ts";
import {useForm} from "react-hook-form";
import {useRegisterCompanyMutation} from "../../core/features/companyServerApi.ts";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";

const RegisterCompany = () => {

    const userData = useSelector(selectUserData)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm<RegisterCompanyDto>()

    const [registerCompany] = useRegisterCompanyMutation()

    const submitForm = (data: RegisterCompanyDto) => {
        const registerCompanyPromise = registerCompany(data).unwrap()

        toast.promise(registerCompanyPromise, {
            loading: "Registrando...",
            success: () => {
                dispatch(saveUserInfo({...userData!, isOwner: true}))
                navigate('/')
                return "Empresa registrada"
            },
            error: (err) => {
                console.error(err)
                return "Error al registrar"
            }
        })
    }

    useEffect(() => {
        if (userData!.companyId !== null) navigate("/")
        setValue("userId", userData!.id)
    }, []);

    return (
        <article
            className="fixed inset-0 flex justify-center items-center z-40 bg-black bg-opacity-70 backdrop-blur-sm">
            <div className="relative w-full max-w-[90%] p-8 max-h-[95svh] overflow-y-auto bg-white rounded-lg shadow-lg">
                <h1 className="text-center text-2xl md:text-3xl font-bold text-primary-purple">¡Bienvenido, {userData!.name}!</h1>
                <p className="text-center text-lg text-gray-600 mt-2">Estás a un paso de administrar tu negocio
                    en <strong>Stockify</strong>!</p>

                <form onSubmit={handleSubmit(submitForm)} className="mt-6 space-y-0 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-0 md:gap-6">
                        <div className="input-container">
                            <label htmlFor="name" className="label-form">Nombre de empresa</label>
                            <input type="text" className="input-form special-input"
                                   {...register("name", {required: "Nombre requerido"})} />
                            {errors.name && <span className="form-error">{errors.name.message}</span>}
                        </div>

                        <div className="input-container">
                            <label htmlFor="contact" className="label-form">Contacto</label>
                            <input type="text" className="input-form special-input"
                                   {...register("phoneNumber", {required: "Contacto requerido"})} />
                            {errors.phoneNumber && <span className="form-error">{errors.phoneNumber.message}</span>}
                        </div>

                        <div className="input-container">
                            <label htmlFor="rfc" className="label-form">RFC</label>
                            <input type="text" className="input-form special-input"
                                   {...register("rfc", {required: "RFC requerido"})} />
                            {errors.rfc && <span className="form-error">{errors.rfc.message}</span>}
                        </div>
                    </div>

                    <div className="input-container">
                        <label htmlFor="description" className="label-form">
                            Cuentanos sobre tu negocio
                        </label>
                        <textarea className="input-form special-input resize-none overflow-auto "

                                  {...register("description")} />
                        {errors.description && <span className="form-error">{errors.description.message}</span>}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button type="submit" className="submit-button w-full">Registrar empresa</button>
                    </div>
                </form>
            </div>
        </article>
    );
}

export default RegisterCompany