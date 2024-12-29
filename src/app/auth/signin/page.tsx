import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProviders, getCsrfToken } from "next-auth/react";
import AuthLayout from "../AuthLayout"
import AuthForm from "../components/AuthForm";
import AuthProviders from "@/app/auth/components/AuthProviders";

export default async function SignInPage() {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/");
    }

    const csrfToken = await getCsrfToken();
    const providers = await getProviders();

    return (
        <AuthLayout title="Sign In">
            <AuthForm
                csrfToken={csrfToken || undefined}
                formType="signin"
                buttonLabel="Sign In"
            />
            {providers && <AuthProviders providers={providers}/> }

            <div className="mt-4 text-sm">
                <span>Don&apos;t have an account? </span>
                <a className="text-mainGreen-700 hover:underline" href="/auth/register">
                    Register
                </a>
            </div>
        </AuthLayout>
    );
}
