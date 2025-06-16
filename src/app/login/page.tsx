"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import webRoutes from "@/routes/web";

interface IForm {
    identify: string;
    password: string;
}

const schema = yup.object({
    identify: yup.string().required("Email là bắt buộc"),
    password: yup.string().required("Mật khẩu là bắt buộc"),
});

export default function LoginPage() {
    const methods = useForm<IForm>({
        defaultValues: {
            identify: "",
            password: "",
        },
        resolver: yupResolver(schema),
        mode: "all",
    });

    const [loading, setLoading] = useState(false);
    const [messageError, setMessageError] = useState("");

    const onSubmit = async (data: IForm) => {
        setLoading(true);
        try {
            const res = await signIn("credentials", {
                identifier: data.identify,
                password: data.password,
                redirect: false,
            });

            if (res?.error) {
                setMessageError(res.error);
            } else {
                window.location.replace("/");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h1 className="mb-6 text-center text-2xl font-bold">Đăng nhập</h1>
                
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="identify" className="mb-2 block text-sm font-medium">
                                Email hoặc tên đăng nhập
                            </label>
                            <input
                                id="identify"
                                {...methods.register("identify")}
                                className="w-full rounded-lg border border-gray-300 p-2.5"
                            />
                            {methods.formState.errors.identify && (
                                <p className="mt-1 text-sm text-red-600">
                                    {methods.formState.errors.identify.message}
                                </p>
                            )}
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="password" className="mb-2 block text-sm font-medium">
                                Mật khẩu
                            </label>
                            <input
                                id="password"
                                type="password"
                                {...methods.register("password")}
                                className="w-full rounded-lg border border-gray-300 p-2.5"
                            />
                            {methods.formState.errors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {methods.formState.errors.password.message}
                                </p>
                            )}
                        </div>
                        
                        {messageError && (
                            <p className="mb-4 text-sm text-red-600">
                                {messageError}
                            </p>
                        )}
                        
                        <div className="text-end mb-4">
                            <Link
                                className="font-normal text-[14px] text-blue-600 underline"
                                href={webRoutes.auth.forgotPassword}
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-70"
                        >
                            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}