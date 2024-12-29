// src/components/auth/AuthForm.tsx
"use client";

import React, { FormEvent, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

interface AuthFormProps {
    csrfToken?: string;
    formType: "signin" | "register";
    buttonLabel: string;
}


export default function AuthForm({
                                     csrfToken,
                                     formType,
                                     buttonLabel,
                                 }: AuthFormProps) {
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        if (formType === "signin") {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (result?.error) {
                setError(result.error);
            } else {
                router.push("/");
            }
        } else if (formType === "register") {
            try {
                const response = await axios.post("/api/auth/register", data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 201) {
                    setSuccess(response.data.message || "Rejestracja zakończona sukcesem!");
                    router.push("/auth/signin");
                }
            } catch (err: any) {
                if (err.response && err.response.data && err.response.data.error) {
                    setError(err.response.data.error);
                } else {
                    setError("Wystąpił błąd podczas rejestracji.");
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {csrfToken && (
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            )}

            {formType === "register" && (
                <Input
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                />
            )}

            <Input
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
            />
            <Input
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
            />

            {error && <p className="text-red-600 font-semibold">{error}</p>}
            {success && (
                <p className="text-mainGreen-700 font-semibold">{success}</p>
            )}

            <Button
                label={buttonLabel}
                type="submit"
                disabled={false}
                className={"w-full"}
            />
        </form>
    );
}
