import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useNavigate, Link} from "react-router-dom";
import {toast} from "sonner";
import {useRegisterMutation} from "src/core/features/authServerApi";
import {RegisterDto} from "src/core/models/dtos/auth/registerDto";
import {saveUserInfo, authenticate} from "src/core/slices/auth/authSlice";
import Presentation from "@assets/img/Presentation.png";

const Register: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [registerUser] = useRegisterMutation();

    const {
        register,
        handleSubmit,
        formState: {errors},
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
                    ...userData,
                    token: res.token!
                }));

                dispatch(authenticate(true));

                navigate('/register-company');

                return "Exito";
            },
            error: (error) => {
                console.error(error)

                if (error.data?.statusCode === 400) {
                    return "Credenciales incorrectas";
                }

                if (error.status === 409) {
                    return error.data.title
                }

                return "Algo salio mal";
            }
        })
    };

    return (
        <main className="flex justify-center items-center bg-gray-50 h-svh px-0 md:px-10">
            <div
                className="bg-white rounded-none md:rounded-lg border-none md:border-2 h-svh md:h-auto items-center border-gray-100 overflow-auto shadow-xl w-full max-w-6xl flex flex-col">
                <section className="flex w-full grow">
                    <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-10">
                        <h1 className="text-center text-2xl font-bold mb-8">Solo unos pasos para unirte</h1>
                        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
                            <div>
                                <label htmlFor="name"
                                       className="block text-base font-medium text-gray-700">Nombre</label>
                                <input
                                    type="text"
                                    placeholder="Tu nombre"
                                    id="name"
                                    className="mt-1 block w-full border border-gray-300 placeholder:text-sm rounded-lg shadow-sm p-2"
                                    {...register('name', {
                                        required: 'Este campo es obligatorio',

                                    })}
                                />
                                {errors.email &&
                                    <span className="text-red-500 text-sm">{errors.email.message as string}</span>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="firstLastName"
                                           className="block text-base font-medium text-gray-700">Primer apellido</label>
                                    <input
                                        type="text"
                                        placeholder="Escribe tu correo"
                                        id="firstLastName"
                                        className="mt-1 block w-full border border-gray-300 placeholder:text-sm rounded-lg shadow-sm p-2"
                                        {...register('firstLastName', {
                                            required: 'Este campo es obligatorio'
                                        })}
                                    />
                                    {errors.firstLastName &&
                                        <span
                                            className="text-red-500 text-sm">{errors.firstLastName.message as string}</span>}
                                </div>

                                <div>
                                    <label htmlFor="secondLastName"
                                           className="block text-base font-medium text-gray-700">Segundo
                                        apellido</label>
                                    <input
                                        type="text"
                                        placeholder="Escribe tu correo"
                                        id="secondLastName"
                                        className="mt-1 block w-full border border-gray-300 placeholder:text-sm rounded-lg shadow-sm p-2"
                                        {...register('secondLastName', {
                                            required: 'Este campo es obligatorio'
                                        })}
                                    />
                                    {errors.secondLastName &&
                                        <span
                                            className="text-red-500 text-sm">{errors.secondLastName.message as string}</span>}
                                </div>
                            </div>

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
                                {errors.password &&
                                    <span className="text-red-500 text-sm">{errors.password.message as string}</span>}
                            </div>

                            <button type="submit"
                                    className="w-full py-2 px-4 bg-[#6181F7] text-white rounded-md font-medium">
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
                            <Link to="/login" className="text-primary-purple hover:underline">Inicia Sesión</Link>
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

export default Register;