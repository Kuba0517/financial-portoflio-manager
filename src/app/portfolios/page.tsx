"use client";

import { useState, useEffect } from "react";
import NewPortfolioModal from "@/shared/components/PortfolioModal";
import PortfolioList from "@/app/portfolios/components/PortfolioList";
import { PortfolioResponseDTO } from "@/dtos/portfolio.dto";
import apiClient from "@/lib/apiClient";
import Button from "@/shared/components/Button";
import Loader from "@/shared/components/Loader";
import {FaPlus} from "react-icons/fa6";
import {useSession} from "next-auth/react";

export default function PortfoliosPage() {
    const [portfolios, setPortfolios] = useState<PortfolioResponseDTO[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPortfolio, setEditingPortfolio] = useState<PortfolioResponseDTO | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {data: session, status} = useSession();

    const fetchPortfolios = async () => {
        setIsLoading(true);
        try {
            const { data } = await apiClient.get(`/api/portfolios`);
            setPortfolios(data.portfolios);
        } catch (error) {
            console.error("Error fetching portfolios:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const handleOpenModal = (portfolio?: PortfolioResponseDTO) => {
        setEditingPortfolio(portfolio || null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingPortfolio(null);
    };

    const handleSubmitPortfolio = async (name: string, investments: any[]) => {
        console.log(name)
        console.log(investments)
        try {
            if (editingPortfolio) {
                await apiClient.put(`/api/portfolios/${editingPortfolio.id}`, {
                    name,
                    investments,
                });
            } else {
                await apiClient.post(`/api/portfolios`, {
                    name,
                    investments,
                });
            }
            fetchPortfolios();
        } catch (error) {
            console.error("Error saving portfolio:", error);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="p-8 max-w-screen-xl m-auto">
            <h1 className="text-2xl font-bold mb-4">Portfolios</h1>
            {status === "authenticated" && <Button label="Add New Portfolio" onClick={() => handleOpenModal()} className={"w-full"} icon={<FaPlus/>} />}

            <PortfolioList portfolios={portfolios} />

            {isModalOpen && (
                <NewPortfolioModal
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}
