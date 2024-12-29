import React from "react";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-mainGreen-100">
            <h1 className="text-3xl font-bold text-mainGreen-800 mb-8">
                {title}
            </h1>
            <div className="
        w-full max-w-md
        bg-white
        text-mainGreen-900
        p-6
        rounded-md
        shadow-md
        border border-mainGreen-200
      ">
                {children}
            </div>
        </div>
    );
}
