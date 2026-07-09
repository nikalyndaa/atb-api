import { useSelector } from "react-redux";
import { Link } from "react-router";
import type { RootState } from "../store";
import { useGetUsersQuery } from "../services/usersApi";

const HomePage = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    // Запит виконується тільки якщо користувач залогінений
    const { data: myUsers, isLoading, isError } = useGetUsersQuery(undefined, {
        skip: !user,
    });

    // === Сторінка вітання для незалогінених ===
    if (!user) {
        return (
            <div className="flex-1 flex items-center justify-center px-6">
                <div className="max-w-xl text-center">
                    <h1 className="
                        text-4xl md:text-5xl font-bold tracking-tight
                        text-slate-900 dark:text-slate-50
                        mb-4
                    ">
                        Ласкаво просимо до КозакиApp
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">
                        Увійдіть або зареєструйтесь, щоб побачити список користувачів спільноти
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <Link
                            to="/login"
                            className="
                                px-5 py-2.5 rounded-xl text-sm font-medium
                                bg-gradient-to-r from-indigo-500 to-violet-600
                                text-white shadow-md shadow-indigo-500/30
                                hover:shadow-indigo-500/50 hover:scale-[1.02]
                                transition-all duration-200
                            "
                        >
                            Увійти
                        </Link>
                        <Link
                            to="/register"
                            className="
                                px-5 py-2.5 rounded-xl text-sm font-medium
                                bg-slate-100 dark:bg-slate-800
                                text-slate-700 dark:text-slate-300
                                border border-slate-200 dark:border-slate-700
                                hover:bg-slate-200 dark:hover:bg-slate-700
                                transition-all duration-200
                            "
                        >
                            Зареєструватись
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // === Список користувачів для залогінених (як було) ===
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-6 py-5 text-center">
                <h1 className="
                    text-5xl md:text-6xl font-bold tracking-tight
                    text-slate-900 dark:text-slate-50
                    mb-4
                ">
                    Користувачі
                </h1>
            </div>

            <div className="max-w-4xl mx-auto px-6 pb-20">
                <div className="
                    rounded-2xl overflow-hidden
                    border border-slate-200 dark:border-slate-800
                    bg-white dark:bg-slate-900
                    shadow-sm
                ">
                    {isLoading ? (
                        <div className="py-16 text-center text-slate-500 dark:text-slate-400">
                            Завантаження...
                        </div>
                    ) : isError ? (
                        <div className="py-16 text-center text-red-500 dark:text-red-400">
                            Щось пішло не так
                        </div>
                    ) : myUsers?.length === 0 ? (
                        <div className="py-16 text-center text-slate-500 dark:text-slate-400">
                            Користувачів не знайдено
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                <tr className="
                                        bg-slate-50 dark:bg-slate-800/50
                                        border-b border-slate-200 dark:border-slate-800
                                    ">
                                    <th className="px-6 py-3 font-medium text-slate-500 dark:text-slate-400">Email</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 dark:text-slate-400">Ім'я</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 dark:text-slate-400">Прізвище</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 dark:text-slate-400">Логін</th>
                                </tr>
                                </thead>
                                <tbody>
                                {myUsers?.map((u) => (
                                    <tr
                                        key={u.id}
                                        className="
                                                border-b border-slate-100 dark:border-slate-800/60
                                                last:border-b-0
                                                hover:bg-slate-50 dark:hover:bg-slate-800/30
                                                transition-colors
                                            "
                                    >
                                        <td className="px-6 py-3 text-slate-900 dark:text-slate-100">{u.email}</td>
                                        <td className="px-6 py-3 text-slate-700 dark:text-slate-300">{u.first_name}</td>
                                        <td className="px-6 py-3 text-slate-700 dark:text-slate-300">{u.last_name}</td>
                                        <td className="px-6 py-3 text-slate-500 dark:text-slate-400">@{u.username}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;