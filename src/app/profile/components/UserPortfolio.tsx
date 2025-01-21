"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import { UserResponseDTO } from "@/dtos/user.dto";
import Loader from "@/shared/components/Loader";
import Button from "@/shared/components/Button";
import NewPortfolioModal from "@/shared/components/PortfolioModal";
import { Session } from "next-auth";

interface Portfolio {
    id: string;
    name: string;
}

interface UserPortfolioProps {
    user: UserResponseDTO;
    session: Session | null;
}

export default function UserPortfolio({ user, session }: UserPortfolioProps) {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchPortfolios = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/api/portfolios?userId=${user.id}`);
            setPortfolios(response.data.portfolios);
        } catch (err) {
            console.error("Error fetching portoflios", err);
            setError("Faile to load portfolios");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPortfolios();
    }, [user.id]);

    const handleDelete = async (id: string) => {
        if (!confirm("Do you really want to delete this portfolio?")) return;

        try {
            await apiClient.delete(`/api/portfolios/${id}`);
            setPortfolios((prev) => prev.filter((portfolio) => portfolio.id !== id));
            alert("Portfolio deleted successfully");
        } catch (error) {
            console.error("Error deleting portfolio:", error);
            alert("Failed to delete portfolio. Please try again.");
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!session) {
        return <p>The user may not be logged in</p>;
    }

    return (
        <div className="flex flex-col border border-mainGreen-200 p-6 rounded-xl shadow bg-white">
            <h2 className="text-2xl font-bold text-mainGreen-800 mb-4">Your Portfolios</h2>
            <p className="text-sm text-mainGreen-700 mb-4">
                Total portfolios: <span className="font-semibold">{portfolios.length}</span>
            </p>
            <div className="flex flex-col gap-8">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {portfolios.map((portfolio) => (
                        <li
                            key={portfolio.id}
                            className="group flex flex-col items-center justify-between p-4 h-40 w-full bg-mainGreen-100 text-mainGreen-800 rounded-lg shadow border border-mainGreen-300"
                        >
                            <h3 className="text-lg font-semibold truncate w-full text-center">
                                {portfolio.name}
                            </h3>
                            <p className="text-sm text-mainGreen-600 truncate w-full text-center">
                                View details
                            </p>
                            <div className="flex gap-5">
                                <Link href={`/portfolios/${portfolio.id}`}>
                                    <Button label={"Open"} />
                                </Link>
                                <Button
                                    label={"Delete"}
                                    onClick={() => handleDelete(portfolio.id)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
                <Button
                    label={"Add new portfolio"}
                    onClick={() => setIsModalOpen(true)}
                />
            </div>
            {isModalOpen && (
                <NewPortfolioModal
                    onClose={() => {
                        setIsModalOpen(false);
                        fetchPortfolios();
                    }}
                    session={session}
                />
            )}
        </div>
    );
}
