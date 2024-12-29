import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {getCsrfToken, getProviders} from "next-auth/react";
import AuthLayout from "../AuthLayout"
import AuthForm from "../components/AuthForm";
import AuthProviders from "@/app/auth/components/AuthProviders";

export default async function RegisterPage() {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/");
    }

    const csrfToken = await getCsrfToken();
    const providers = await getProviders();

    return (
        <AuthLayout title="Register">
            <AuthForm csrfToken={csrfToken} formType="register" buttonLabel="Create Account" />
            {providers && <AuthProviders providers={providers}/> }

            <div className="mt-4 text-sm">
                <span>Already have an account? </span>
                <a className="text-mainGreen-700 hover:underline" href="/auth/signin">
                    Sign In
                </a>
            </div>
        </AuthLayout>
    );
}
