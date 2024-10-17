import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {useLoginMutation} from "src/core/features/authServerApi";
import {LoginDto} from "src/core/models/dtos/auth/loginDto";
import {useDispatch} from "react-redux";
import {saveUserInfo, authenticate} from "src/core/slices/auth/authSlice";
import Presentation from "@assets/img/Presentation.png"
import {toast} from "sonner";
import {ErrorResponse} from "../../core/models/responses/error.response.ts";

const Login: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<LoginDto>();

    const submitForm = async (data: LoginDto) => {
        const loginPromise = login(data).unwrap();

        toast.promise(loginPromise, {
            loading: "Cargando",
            success: (res) => {
                reset()
                const userData = res.dataObject!;

                localStorage.setItem('userData', JSON.stringify(userData));
                localStorage.setItem('auth', JSON.stringify(res.token));

                dispatch(saveUserInfo({
                    ...userData,
                    token: res.token!
                }));

                dispatch(authenticate(true));

                if (userData.companyId === null)
                    navigate("/register-company")
                else
                    navigate('/');

                return "Exito";
            },
            error: (error: ErrorResponse) => {
                console.error(error)

                return error.data.title || "Algo salio mal";
            }
        })
    };

    return (
        <main className="flex justify-center items-center bg-gray-50 h-svh px-0 md:px-10">
            <div
                className="bg-white rounded-none md:rounded-lg border-none md:border-2 h-svh md:h-auto items-center border-gray-100 overflow-auto shadow-xl w-full max-w-4xl flex flex-col">
                <section className="flex w-full grow">
                    <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-10">
                        <h1 className="text-center text-2xl font-bold mb-8">Bienvenido de nuevo</h1>
                        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
                            <div>
                                <label htmlFor="email"
                                       className="block text-base font-medium text-gray-700">Correo</label>
                                <input
                                    type="text"
                                    placeholder="Escribe tu correo"
                                    id="email"
                                    className="mt-1 block w-full border border-gray-300 placeholder:text-sm rounded-lg shadow-sm p-2"
                                    {...register('email', {
                                        required: 'Este campo es obligatorio',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: 'Dirección de correo electrónico inválida',
                                        },
                                    })}
                                />
                                {errors.email &&
                                    <span className="text-red-500 text-sm">{errors.email.message as string}</span>}
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block text-base font-medium text-gray-700">Contraseña</label>
                                <input
                                    type="password"
                                    placeholder="*****"
                                    id="password"
                                    className="mt-1 block w-full border border-gray-300 placeholder:text-sm rounded-lg shadow-sm p-2"
                                    {...register('password', {
                                        required: 'Este campo es obligatorio',
                                    })}
                                />
                                {errors.password && <span
                                    className="text-red-500 text-sm">{errors.password.message as string}</span>}
                            </div>
                            <div className="flex justify-end items-center">
                                <Link to="/ResetPassword"
                                      className="flex-row-reverse text-sm text-[#6181F7] hover:underline">¿Olvidaste
                                    tu contraseña?</Link>
                            </div>
                            <button type="submit"
                                    className="w-full py-2 px-4 bg-[#6181F7] text-white rounded-md font-medium">
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
                            <Link to="/register" className="text-primary-purple hover:underline">Crear Cuenta</Link>
                        </div>
                    </div>

                    <div
                        className="hidden md:w-1/2  md:flex bg-[#6181F7] flex-col justify-center p-20 md:p-10 min-h-max">
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="text-white text-3xl lg:text-4xl font-moul mb-8 ">Stockify.com</h2>
                            <img src={Presentation} alt="Analytics Image" className="max-w-full"/>
                        </div>
                    </div>
                </section>


                <footer className="bg-primary-purple w-full p-1 md:hidden">
                    <p className="font-moul text-base text-white text-center">Stockify.com</p>
                </footer>
            </div>
        </main>
    );
}

export default Login;
