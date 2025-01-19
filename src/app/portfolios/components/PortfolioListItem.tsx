"use client";

import { useRouter } from "next/navigation";
import Button from "@/shared/components/Button";
import apiClient from "@/lib/apiClient";

interface PortfolioListItemProps {
    id: string;
    name: string;
    userName?: string;
    isAdmin?: boolean;
}

export default function PortfolioListItem({ id, name, userName, isAdmin }: PortfolioListItemProps) {
    const router = useRouter();

    const handleViewDetails = () => {
        router.push(`/portfolios/${id}`);
    };

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete the portfolio "${name}"?`)) {
            return;
        }

        try {
            await apiClient(`/api/portfolios/${id}`);

            alert("Portfolio deleted successfully.");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Error deleting portfolio.");
        }
    };

    return (
        <li
            className={`
        p-4
        bg-mainGreen-100
        text-mainGreen-900
        rounded-lg
        shadow
        border border-mainGreen-200
        transition-shadow
        duration-300
        hover:shadow-md
      `}
        >
            {userName && (
                <h2
                    className={`
            mb-2 
            text-lg
            font-semibold
            tracking-wide
            uppercase
            text-mainGreen-800
          `}
                >
                    {userName}
                </h2>
            )}
            <p className="mb-2 text-base truncate">{name}</p>

            <div className="flex gap-2">
                <Button label="View Details" onClick={handleViewDetails} />
                {isAdmin && (
                    <>
                        <Button
                            label="Delete"
                            onClick={handleDelete}
                            className="bg-red-500 text-white hover:bg-red-600"
                        />
                    </>
                )}
            </div>
        </li>
    );
}
