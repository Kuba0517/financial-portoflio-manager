"use client";

import { signIn } from "next-auth/react";
import type { ClientSafeProvider } from "next-auth/react";

interface AuthProvidersProps {
    providers: Record<string, ClientSafeProvider> | null;
}

export default function AuthProviders({ providers }: AuthProvidersProps) {
    return (
        <>
            {providers &&
                Object.values(providers).map((provider) => {
                    if (provider.id === "google") {
                        return (
                            <div key={provider.name} className="mb-4">
                                <button
                                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                                    className="
                    w-full py-2
                    bg-mainGreen-500
                    text-white font-semibold
                    rounded
                    hover:bg-mainGreen-600
                    focus:outline-none focus:ring-2 focus:ring-mainGreen-400
                  "
                                >
                                    Sign in with {provider.name}
                                </button>
                            </div>
                        );
                    }
                    return null;
                })}
        </>
    );
}
