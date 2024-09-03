import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "src/core/features/authServerApi";
import LoaderBig from "src/shared/components/LoaderBig";
import { useState } from "react";
import { LoginDto } from "src/core/models/dtos/auth/loginDto";
import { useDispatch } from "react-redux";
import { saveUserInfo, authenticate } from "src/core/slices/auth/authSlice";
import { extractFetchErrorMessage } from "src/core/utils/extractFetchErrorMessage";
import Presentation from "@assets/img/Presentation.png"

const Login: React.FC = () => {

    const [errorAlert, setErrorAlert] = useState<Boolean>(false);
    const [messageError, setMessageError] = useState<string>('')

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginDto>();

    const submitForm = async (data: LoginDto) => {
        try {
            setErrorAlert(false)
            const res = await login(data)

            if (res.error) {
                setErrorAlert(true);
                const message = extractFetchErrorMessage(res.error);
                setMessageError(message);
                throw new Error(message);
            }

            if (res.data?.statusCode === 404) {
                setErrorAlert(true);
                setMessageError('Credenciales incorrectas');
                return;
            }

            reset()
            const userData = res.data?.dataObject;

            if (!userData || !res.data?.token) {
                return;
            }

            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('auth', JSON.stringify(res.data.token));

            dispatch(saveUserInfo({
                id: userData.id,
                name: userData.name,
                lastName: userData.lastName,
                email: userData.email,
                token: res.data.token,
            }));

            dispatch(authenticate(true));
            navigate('/');
        }
        catch (error) {
            console.error(error)
        }
    };

    return (
        <main className="flex justify-center items-center bg-gray-100 min-h-screen">
            {isLoading && (
                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                    <LoaderBig message={'Espere...'} />
                </div>
            )}
            <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-auto shadow-lg w-full max-w-4xl">
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <h1 className="text-center text-2xl font-bold mb-8">Bienvenido de nuevo</h1>
                    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo</label>
                            <input
                                type="text"
                                placeholder="Escribe tu correo"
                                id="email"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                                {...register('email', {
                                    required: 'Este campo es obligatorio',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'Dirección de correo electrónico inválida',
                                    },
                                })}
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message as string}</span>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                placeholder="*****"
                                id="password"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                                {...register('password', {
                                    required: 'Este campo es obligatorio',
                                })}
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message as string}</span>}
                        </div>
                        <div className="flex justify-between items-center">
                            <Link to="/ResetPassword" className="flex-row-reverse text-sm text-[#6181F7] hover:underline">¿Olvidaste tu contraseña?</Link>
                        </div>
                        <button type="submit" className="w-full py-2 px-4 bg-[#6181F7] text-white rounded-md font-medium">
                            Iniciar Sesión
                        </button>
                    </form>
                    <div className="mt-4 flex justify-center items-center">
                        <span className="text-gray-500">o</span>
                    </div>
                    <div className="mt-4 flex justify-center">

                    </div>
                    <div className="mt-6 text-center">
                        <span className="text-gray-600">¿Aún no tienes cuenta? </span>
                        <Link to="/register" className="text-[#6181F7] hover:underline">Crear Cuenta</Link>
                    </div>
                </div>
                <div className="hidden md:block md:w-1/2 bg-[#6181F7] p-8 lg:p-20">
                    <div className="flex flex-col items-center justify-center h-full">
                        <h2 className="text-white text-3xl lg:text-4xl font-bold mb-8 ">Stockify.com</h2>
                        <img src={Presentation} alt="Analytics Image" className="max-w-full h-auto" />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;
