import { Navigate, Link } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UserPage = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const avatarSrc = user.image_large
        ? `${BACKEND_URL}/images/${user.image_large}`
        : null;

    const initials = `${user.first_name?.[0] ?? ""}${user.last_name?.[0] ?? ""}`.toUpperCase();

    return (
        <div className="flex-1 px-6 py-10">
            <div className="max-w-2xl mx-auto">

                <Link to="/" className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-500 mb-6 transition-colors">
                    ← На головну
                </Link>

                <div className="
                    bg-white dark:bg-slate-900
                    border border-slate-200 dark:border-slate-800
                    rounded-2xl shadow-sm
                    p-8
                ">
                    {/* Header block */}
                    <div className="flex items-center gap-5 mb-8">
                        <div className="
                            w-20 h-20 rounded-full overflow-hidden flex-shrink-0
                            bg-gradient-to-br from-indigo-500 to-violet-600
                            flex items-center justify-center
                        ">
                            {avatarSrc ? (
                                <img src={avatarSrc} alt={user.username} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-white text-2xl font-semibold">{initials || "?"}</span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                                {user.first_name} {user.last_name}
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400">@{user.username}</p>
                        </div>
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1">
                                Електронна пошта
                            </p>
                            <p className="text-sm text-slate-800 dark:text-slate-200">{user.email}</p>
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1">
                                Логін
                            </p>
                            <p className="text-sm text-slate-800 dark:text-slate-200">@{user.username}</p>
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1">
                                Ім'я
                            </p>
                            <p className="text-sm text-slate-800 dark:text-slate-200">{user.first_name || "—"}</p>
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1">
                                Прізвище
                            </p>
                            <p className="text-sm text-slate-800 dark:text-slate-200">{user.last_name || "—"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;