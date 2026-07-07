import React, { useState, useEffect, useRef } from "react"
import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form"

type FormAvatarInputProps<T extends FieldValues> = {
    control: Control<T>
    name: FieldPath<T>
    label?: string
}

export function FormAvatarInput<T extends FieldValues>({
    control,
    name,
    label = "Фото профілю"
}: FormAvatarInputProps<T>) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl)
        }
    }, [previewUrl])

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange }, fieldState: { error } }) => {
                const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0] ?? null

                    // Очистити попереднє прев'ю, щоб не було витоку пам'яті
                    if (previewUrl) URL.revokeObjectURL(previewUrl)

                    if (file) {
                        const url = URL.createObjectURL(file)
                        setPreviewUrl(url)
                        onChange(file)
                    } else {
                        setPreviewUrl(null)
                        onChange(null)
                    }
                }

                return (
                    <div className="flex flex-col items-center gap-3">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 self-start mb-1">
                            {label}
                        </label>

                        <div
                            onClick={() => inputRef.current?.click()}
                            className="
                                relative w-24 h-24 rounded-full cursor-pointer
                                border-2 border-dashed border-slate-300 dark:border-slate-700
                                bg-slate-50 dark:bg-slate-800
                                flex items-center justify-center overflow-hidden
                                hover:border-indigo-400 dark:hover:border-indigo-500
                                transition-colors duration-200
                                group
                            "
                        >
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt="Прев'ю аватарки"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28" height="28" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="1.5"
                                    strokeLinecap="round" strokeLinejoin="round"
                                    className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-400 dark:group-hover:text-indigo-500 transition-colors duration-200"
                                >
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                    <circle cx="12" cy="13" r="4" />
                                </svg>
                            )}

                            {/* Overlay при наведенні */}
                            <div className="
                                absolute inset-0 bg-black/0 group-hover:bg-black/30
                                transition-colors duration-200
                                flex items-center justify-center
                            ">
                                <span className="
                                    opacity-0 group-hover:opacity-100
                                    text-white text-[11px] font-medium
                                    transition-opacity duration-200
                                ">
                                    Змінити
                                </span>
                            </div>
                        </div>

                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {previewUrl && (
                            <button
                                type="button"
                                onClick={() => {
                                    if (previewUrl) URL.revokeObjectURL(previewUrl)
                                    setPreviewUrl(null)
                                    onChange(null)
                                    if (inputRef.current) inputRef.current.value = ""
                                }}
                                className="text-xs text-red-500 dark:text-red-400 hover:underline"
                            >
                                Видалити фото
                            </button>
                        )}

                        {error && (
                            <p className="text-xs text-red-500 dark:text-red-400 mt-1 self-start">
                                {error.message}
                            </p>
                        )}
                    </div>
                )
            }}
        />
    )
}