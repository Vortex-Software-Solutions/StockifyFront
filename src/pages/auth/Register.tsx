import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { useRegisterMutation } from "src/core/features/authServerApi";
import { RegisterDto } from "src/core/models/dtos/auth/registerDto";
import { saveUserInfo, authenticate } from "src/core/slices/auth/authSlice";
import LoaderBig from "src/shared/components/LoaderBig";
import Presentation from "@assets/img/Presentation.png";

const Register: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [registerUser, { isLoading }] = useRegisterMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterDto>();

    const submitForm = async (data: RegisterDto) => {
        const registerPromise = registerUser(data).unwrap();

        toast.promise(registerPromise, {
            loading: "Cargando",
            success: (res) => {
                reset()
                const userData = res.dataObject!;

                localStorage.setItem('userData', JSON.stringify(userData));
                localStorage.setItem('auth', JSON.stringify(res.token));

                dispatch(saveUserInfo({
                    id: userData.id,
                    name: userData.name,
                    lastName: userData.lastName,
                    email: userData.email,
                    token: res.token!,
                }));

                dispatch(authenticate(true));

                navigate('/');

                return "Exito";
            },
            error: (error) => {
                console.error(error)

                if (error.data?.statusCode === 400) {
                    return "Credenciales incorrectas";
                }

                return "Algo salio mal";
            }
        })
    };

    return (
        <main className="flex justify-center items-center bg-gray-50 min-h-svh px-0 md:px-10">
            {isLoading && (
                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                    <LoaderBig />
                </div>
            )}

            <div className="flex flex-col md:flex-row flex-1 bg-white rounded-none md:rounded-lg border-none md:border-2 h-svh md:h-auto  items-center border-gray-100 overflow-auto shadow-xl w-full max-w-4xl">
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center flex-1 grow">
                    <h1 className="text-center text-2xl font-bold mb-8">Solo unos pasos para unirte</h1>
                    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-base font-medium text-gray-700">Nombre</label>
                            <input
                                type="text"
                                placeholder="Tu nombre"
                                id="name"
                                className="mt-1 block w-full border border-gray-300 placeholder:text-sm rounded-lg shadow-sm p-2"
                                {...register('name', {
                                    required: 'Este campo es obligatorio',

                                })}
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message as string}</span>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-base font-medium text-gray-700">Correo</label>
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
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message as string}</span>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-base font-medium text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                placeholder="*****"
                                id="password"
                                className="mt-1 block w-full border border-gray-300 placeholder:text-sm rounded-lg shadow-sm p-2"
                                {...register('password', {
                                    required: 'Este campo es obligatorio',
                                })}
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message as string}</span>}
                        </div>

                        <button type="submit" className="w-full py-2 px-4 bg-[#6181F7] text-white rounded-md font-medium">
                            Crear cuenta
                        </button>
                    </form>
                    <div className="mt-4 flex justify-center items-center">
                        <span className="text-gray-500">o</span>
                    </div>
                    <div className="mt-4 flex justify-center">

                    </div>
                    <div className="mt-6 text-center">
                        <span className="text-gray-600">¿Ya tienes cuenta? </span>
                        <Link to="/register" className="text-primary-purple hover:underline">Inicia Sesión</Link>
                    </div>
                </div>


                <div className="hidden md:flex md:w-1/2 bg-[#6181F7] flex-col p-20 md:p-10 h-full">
                    <div className="flex flex-col items-center justify-center h-full">
                        <h2 className="text-white text-3xl lg:text-4xl font-moul mb-8 ">Stockify.com</h2>
                        <img src={Presentation} alt="Analytics Image" className="max-w-full h-auto" />
                    </div>
                </div>

                <footer className="bg-primary-purple w-full p-1 md:hidden">
                    <p className="font-moul text-base text-white text-center">Stockify.com</p>
                </footer>
            </div>
        </main>
    );
}

export default Register;