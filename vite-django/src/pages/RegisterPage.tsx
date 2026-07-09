import { Link, useNavigate } from "react-router";
import * as z from "zod";
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../components/FormInput";
import { FormPasswordInput } from "../components/FormPasswordInput";
import { FormAvatarInput } from "../components/FormAvatarInput";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../services/usersApi";
import { setCredentials } from "../store/authSlice";


const MAX_FILE_SIZE = 5 * 1024 * 1024 



const RegisterPage = () => {

    const [register, { isLoading }] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const formSchema = z.object({

        username: z.string({message: "Введіть логін"}),
        firstName: z.string({message: "Введіть ім'я"}),
        lastName: z.string({message: "Введіть прізвище"}),
        email: z.email({ message: "Введіть коректну електронну пошту" }),
        image: z
        .instanceof(File, { message: "Оберіть зображення" })
        .refine(file => file.size <= MAX_FILE_SIZE, {
            message: "Розмір файлу не має перевищувати 5 МБ",
        }),
        password: z
                    .string()
                    .min(6, { message: "Пароль повинен містити щонайменше 6 символів" })
                    .max(100, { message: "Пароль занадто довгий" }),
        confirmPassword: z
                    .string()
                    .min(6, { message: "Пароль повинен містити щонайменше 6 символів" })
                    .max(100, { message: "Пароль занадто довгий" })
    }).refine(data => data.password === data.confirmPassword, {
        message: "Паролі не співпадають",
        path: ["confirmPassword"],
})

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            image: undefined,
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const user = await register({
                username: data.username, 
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                password: data.password,
                confirm_password: data.confirmPassword,
                image: data.image,
            }).unwrap();

            dispatch(setCredentials(user));
            navigate("/");
        } catch (err) {
            console.error(err);

        }
    };

    return (
        <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 relative">
            {/* Ambient glow */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
                <div className="
                    absolute -top-40 -left-40 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full
                    bg-indigo-400/10 dark:bg-indigo-600/10 blur-3xl
                " />
                <div className="
                    absolute -bottom-40 -right-40 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full
                    bg-violet-400/10 dark:bg-violet-600/10 blur-3xl
                " />
            </div>

            {/* Card Wrapper */}
            <div className="relative w-full max-w-xl z-10 animate-fade-in">
                {/* Form card */}
                <div className="
                    bg-white dark:bg-slate-900
                    border border-slate-200 dark:border-slate-800
                    rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50
                    p-6 sm:p-8
                    transition-colors duration-300
                ">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight mb-1 text-center sm:text-left">
                            Реєстрація
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">
                            Створіть свій акаунт у КозакиApp
                        </p>
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Grouping First & Last Name into modern 2 columns row */}
                        
                        <FormInput
                                control={form.control}  
                                name="username" 
                                label="Логін"
                                placeholder="Введіть логін"
                            />
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            <FormInput
                                control={form.control}  
                                name="firstName" 
                                label="Ім'я"
                                placeholder="Введіть ім'я"
                            />

                            <FormInput
                                control={form.control}  
                                name="lastName" 
                                label="Прізвище"
                                placeholder="Введіть прізвище"
                            />

                        </div>

                            <FormInput
                            control={form.control}
                            name="email"
                            label="Електронна адреса"
                            placeholder="Введіть електронну адресу"
                            />
                        
                            <FormAvatarInput control={form.control} name="image" />

                            <FormPasswordInput 
                            control={form.control}
                            name="password"
                            label="Пароль"
                            />

                            <FormPasswordInput 
                            control={form.control}
                            name="confirmPassword"
                            label="Пароль"
                            />


                        {/* Remember me */}
                        <div className="flex items-center gap-2.5 pt-1">
                            <input
                                id="remember"
                                type="checkbox"
                                className="w-4 h-4 rounded-md border-slate-300 dark:border-slate-600 accent-indigo-500 cursor-pointer"
                            />
                            <label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                                Запам'ятати мене
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-2 py-2.5 px-4 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/40 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                    </svg>
                                    Реєстрація...
                                </>
                            ) : "Зареєструватися"}
                        </button>
                    </form>
                </div>

                {/* Register link */}
                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                    Вже є акаунт?{" "}
                    <Link to="/login" className="text-indigo-500 dark:text-indigo-400 font-medium hover:underline">
                        Увійти
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;