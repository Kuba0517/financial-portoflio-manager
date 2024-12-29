"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

export default function Button({
                                   label,
                                   onClick,
                                   disabled = false,
                               }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            className={cn(
                "px-4 py-2 rounded-md font-semibold transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-mainGreen-400 focus:ring-offset-2",
                disabled
                    ? "opacity-50 cursor-not-allowed bg-mainGreen-100 text-mainGreen-800"
                    : "bg-mainGreen-200 text-mainGreen-900 hover:bg-mainGreen-300"
            )}
        >
            {label}
        </button>
    );
}
