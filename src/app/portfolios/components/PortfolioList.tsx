"use client";

import React, { useState, useEffect, useRef } from "react";
import PortfolioListItem from "./PortfolioListItem";
import { PortfolioResponseDTO } from "@/dtos/portfolio.dto";
import Loader from "@/shared/components/Loader";
import NewPortfolioModal from "@/shared/components/PortfolioModal";
import apiClient from "@/lib/apiClient";
import Button from "@/shared/components/Button";
import { FaPlus } from "react-icons/fa6";
import { Session } from "next-auth";
import { UserRole } from "@/types/UserRoles";

interface PortfolioListProps {
    session: Session | null;
}

export default function PortfolioList({ session }: PortfolioListProps) {
    const [portfolios, setPortfolios] = useState<PortfolioResponseDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const limit = 10;
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const isAuthenticated = Boolean(session);
    const isAdmin = session?.user?.role === UserRole.ADMIN;

    useEffect(() => {
        const fetchPortfolios = async () => {
            setIsLoading(true);
            try {
                const { data } = await apiClient.get(
                    `/api/portfolios?page=${page}&limit=${limit}`
                );
                setPortfolios((prev) => [...prev, ...data.portfolios]);
                setHasMore(data.portfolios.length === limit);
            } catch (error) {
                console.error("Error fetching portfolios:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPortfolios();
    }, [page, limit]);

    useEffect(() => {
        if (isLoading || !hasMore) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prevPage) => prevPage + 1);
            }
        });
        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [isLoading, hasMore]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDeletePortfolio = async (id: string) => {
        if (!confirm("Are you sure you want to delete this portfolio?")) return;
        setIsLoading(true);
        try {
            await apiClient.delete(`/api/portfolios/${id}`);
            setPortfolios((prev) => prev.filter((portfolio) => portfolio.id !== id));
            alert("Portfolio deleted");
        } catch (error) {
            console.error("Error deleting portfolio:", error);
            alert("Failed to delete portoflio");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isAuthenticated && (
                <Button
                    label="Add New Portfolio"
                    onClick={handleOpenModal}
                    className="w-full"
                    icon={<FaPlus />}
                />
            )}

            <ul className="space-y-4 max-w-screen-xl m-auto">
                {portfolios.map((portfolio) => (
                    <PortfolioListItem
                        key={portfolio.id}
                        id={portfolio.id}
                        name={portfolio.name}
                        userName={portfolio.user?.name}
                        isAdmin={isAdmin}
                        onDelete={() => handleDeletePortfolio(portfolio.id)}
                    />
                ))}
            </ul>

            {isLoading && <Loader />}
            {!isLoading && !hasMore && <p>No more portfolios to load.</p>}

            <div ref={loaderRef} />

            {isModalOpen && session && <NewPortfolioModal onClose={handleCloseModal} session={session} />}
        </>
    );
}
