import React, { useState } from "react"
import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form"

type FormPasswordInputProps<T extends FieldValues> = {
    control: Control<T>
    name: FieldPath<T>
    label: string
    placeholder?: string
    hideToggle?: boolean
}

export function FormPasswordInput<T extends FieldValues>({
                                                             control,
                                                             name,
                                                             label,
                                                             placeholder = "••••••••",
                                                             hideToggle = false
                                                         }: FormPasswordInputProps<T>) {
    const [showPass, setShowPass] = useState(false);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        {label}
                    </label>
                    <div className="relative">
                        <input
                            {...field}
                            value={field.value ?? ""}
                            type={showPass ? "text" : "password"}
                            placeholder={placeholder}
                            className={`w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:ring-2 transition-all duration-200 ${!hideToggle ? "pr-11" : ""} 
                                ${error 
                                    ? "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                                    : "border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-indigo-400/20 dark:focus:ring-indigo-500/20"
                                }
                            `}
                        />
                        
                        {!hideToggle && (
                            <button
                                type="button"
                                onClick={() => setShowPass(v => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            >
                                {showPass ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                )}
                            </button>
                        )}
                    </div>
                    {error && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">
                            {error.message}
                        </p>
                    )}
                </div>
            )}
        />
    );
}