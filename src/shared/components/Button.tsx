"use client";

import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right"; // Możliwość ustawienia pozycji ikony
}

export default function Button({
                                   label,
                                   icon,
                                   iconPosition = "left",
                                   className,
                                   ...props
                               }: ButtonProps) {
    return (
        <button
            {...props}
            aria-label={label}
            className={cn(
                "flex items-center justify-center gap-2", // Flexbox i odstęp między ikoną a tekstem
                "px-4 py-2 rounded-md font-semibold transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-mainGreen-400 focus:ring-offset-2",
                props.disabled
                    ? "opacity-50 cursor-not-allowed bg-mainGreen-100 text-mainGreen-800"
                    : "bg-mainGreen-200 text-mainGreen-900 hover:bg-mainGreen-300",
                className
            )}
        >
            {icon && iconPosition === "left" && <span>{icon}</span>}
            <span>{label}</span>
            {icon && iconPosition === "right" && <span>{icon}</span>}
        </button>
    );
}
