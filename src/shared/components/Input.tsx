// src/components/Input.tsx
"use client";

import React, { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export default function Input({ label, className, ...props }: InputProps) {
    const id = props.id || props.name;

    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="block text-sm font-medium text-mainGreen-900">
                {label}
            </label>
            <input
                id={id}
                {...props}
                className={cn(
                    "mt-1 block w-full",
                    "bg-mainGreen-100",
                    "border border-mainGreen-200",
                    "rounded",
                    "p-2",
                    "focus:outline-none focus:ring-2 focus:ring-mainGreen-500",
                    className
                )}
            />
        </div>
    );
}
