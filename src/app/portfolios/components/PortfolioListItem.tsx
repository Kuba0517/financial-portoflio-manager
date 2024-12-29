"use client";

import { useRouter } from "next/navigation";
import Button from "@/shared/components/Button";

interface PortfolioListItemProps {
    id: string;
    name: string;
    userName?: string;
}

export default function PortfolioListItem({ id, name, userName }: PortfolioListItemProps) {
    const router = useRouter();

    const handleViewDetails = () => {
        router.push(`/portfolios/${id}`);
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
            <p className="mb-2 text-base">
                {name}
            </p>

            <Button
                label="View Details"
                onClick={handleViewDetails}
            />
        </li>
    );
}
