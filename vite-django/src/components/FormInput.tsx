import React from "react"
import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form"

type FormInputProps<T extends FieldValues> = {
    control: Control<T>
    name: FieldPath<T>
    label: string
    placeholder?: string
    type?: React.HTMLInputTypeAttribute
}

export function FormInput<T extends FieldValues>({
                                                     control,
                                                     name,
                                                     label,
                                                     placeholder,
                                                     type = "text"
                                                 }: FormInputProps<T>) {
    const isFile = type === "file";

    const baseInputClasses = "w-full px-4 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:ring-2 transition-all duration-200";
    const fileClasses = "py-2 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-600 dark:file:bg-indigo-500/10 dark:file:text-indigo-400 hover:file:bg-indigo-100 cursor-pointer";
    const textClasses = "py-2.5";

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value, ref, ...fieldProps }, fieldState: { error } }) => (
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        {label}
                    </label>
                    
                    <input
                        {...fieldProps}
                        ref={ref}
                        type={type}
                        placeholder={placeholder}
                        onChange={(e) => {
                            if (isFile) {
                                onChange(e.target.files ? e.target.files[0] : null);
                            } else {
                                onChange(e.target.value);
                            }
                        }}
                        value={isFile ? "" : (value ?? "")}
                        className={`
                            ${baseInputClasses} 
                            ${isFile ? fileClasses : textClasses} 
                            ${error 
                                ? "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                                : "border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-indigo-400/20 dark:focus:ring-indigo-500/20"
                            }
                        `}
                    />

                    {/* Відображення тексту помилки */}
                    {error && (
                        <p className="mt-1.5 text-xs font-medium text-red-500 animate-fadeIn">
                            {error.message}
                        </p>
                    )}
                </div>
            )}
        />
    );
}