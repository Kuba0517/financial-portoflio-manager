import React from 'react';

interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

export default function Button({ label, onClick, disabled = false }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`bg-primary text-white px-4 py-2 rounded focus:outline focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent'
            }`}
            aria-label={label}
        >
            {label}
        </button>
    );
}
